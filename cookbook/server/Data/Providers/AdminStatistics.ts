const {Users, CookBooks, Recipes} = require("../../models/modelsExporter");

const {Aggregator} = require("../utils/Aggregator");
const {COMMON} = require("../ConstantsProvider");
const {
    userRecipesCount,
    userCookBooksCount,
    userStatisticsFields,
    blockedUsers,
    deletedUsers,
    cookBooksStatisticFields,

    authorLookup
} = require("../../models/lookups");
const {paginator} = require("../utils/paginator");

const aggregateOptions = Aggregator(COMMON);

const getUserAggregate = (aggregator = false) => {
    const resultAggregate = [
        userRecipesCount,
        userCookBooksCount,
        userStatisticsFields
    ]
    if (aggregator)
        resultAggregate.push(aggregator)
    return Users.aggregate(resultAggregate)
}

const getCookbooksAggregate = (aggregator = false) => {
    const resultAggregate = [
        authorLookup,
        cookBooksStatisticFields
    ]
    if (aggregator)
        resultAggregate.push(aggregator)
    return CookBooks.aggregate(resultAggregate)
}


const getRecipesAggregate = (aggregator = false) => {
    const resultAggregate = [
        authorLookup,
        cookBooksStatisticFields
    ]
    if (aggregator)
        resultAggregate.push(aggregator)
    return Recipes.aggregate(resultAggregate)
}

const getUsersGlobalStatistic = async () => {
    return {
        allUsersCount: (await Users.find({})).length,
        blockedUsersCount: (await Users.find({status: 1})).length,
        deletedUsersCount: (await Users.find({status: 2})).length,
    }
}
const getBooksCount = async () => {
    return {
        booksCount: (await CookBooks.find({})).length,
    }
}
const getRecipesCount = async () => {
    return {
        booksCount: (await Recipes.find({})).length,
    }
}
const getBooksViews = async () => {
    return (await CookBooks.aggregate([{$group: {_id: null, amount: {$sum: "$views"}}}]))[0].amount
}
const getRecipesViews = async () => {
    return (await Recipes.aggregate([{$group: {_id: null, amount: {$sum: "$views"}}}]))[0].amount
}
const getMostActive = async () => {
    const cookBooksMaxUser = (await getUsersStatistics(1, "-userCookBooks.count")).docs[0];
    const cookBooksMax = {
        name: `${cookBooksMaxUser.name.first} ${cookBooksMaxUser.name.last}`,
        cookBooksCount: cookBooksMaxUser.userCookBooks[0].count
    }

    const recipesMaxUser = (await getUsersStatistics(1, "-userRecipes.count")).docs[0];
    const recipesMax = {
        name: `${recipesMaxUser.name.first} ${recipesMaxUser.name.last}`,
        recipesCount: recipesMaxUser.userRecipes[0].count
    }

    return {
        cookBooksMax,
        recipesMax
    }
}


export const getUsersStatistics = async (page?: Number, sortBy?: string) => {
    const aggregate = getUserAggregate()
    return await paginator(aggregate, aggregateOptions(page, sortBy))
}
export const getBlockedUsersStatistics = async (page?: Number, sortBy?: string) => {
    const aggregate = getUserAggregate(blockedUsers)
    return await paginator(aggregate, aggregateOptions(page, sortBy))
}
export const getDeletedUsersStatistics = async (page?: Number, sortBy?: string) => {
    const aggregate = getUserAggregate(deletedUsers)
    return await paginator(aggregate, aggregateOptions(page, sortBy))
}

export const getCookBooksStatistics = async (page?: Number, sortBy?: string) => {
    const aggregate = getCookbooksAggregate()
    return await paginator(aggregate, aggregateOptions(page, sortBy))
}
export const getRecipesStatistic = async (page?: Number, sortBy?: string) => {
    const aggregate = getRecipesAggregate()
    return await paginator(aggregate, aggregateOptions(page, sortBy))
}

export const getAllStatistics = async () => {
    let users, mostActive, booksCount, recipesCount, booksViews, recipesViews;
    users = await getUsersGlobalStatistic();
    booksCount = await getBooksCount();
    recipesCount = await getRecipesCount();

    booksViews = await getBooksViews();
    recipesViews = await getRecipesViews();

    mostActive = await getMostActive()
    return {
        users, mostActive, booksCount, recipesCount, booksViews, recipesViews
    }
}


