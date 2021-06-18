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

