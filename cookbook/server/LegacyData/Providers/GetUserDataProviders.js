const {COMMON} = require("../ConstantsProvider");
const {Recipes} = require("../../models/modelsExporter");
const {idInRangeMatcher} = require("../../models/lookups");
const {emailMatcher} = require("../../models/lookups");
const {Aggregator} = require("../utils/Aggregator");
const {paginator} = require("../utils/paginator");
const {commentsLookup} = require("../../models/lookups");
const {authorLookup} = require("../../models/lookups");
const {authorIdMatcher} = require("../../models/lookups");
const {CookBooks} = require("../../models/modelsExporter");
const {publicUserData} = require("../../models/lookups");
const {_idMatcher} = require("../../models/lookups");
const {Users} = require("../../models/modelsExporter");

const aggregateOptions = Aggregator(COMMON)

const getUser = async (id) => {
    return Users.aggregate([_idMatcher(id), publicUserData]);
}

const getUserForLogin = async (email) => {
    return Users.aggregate([
        emailMatcher(email),
    ]);
}

const getUserCookBooks = async (id, filters) => {
    if (!id)
        return false
    if (!filters)
        filters = {page: 1}
    const aggregate = CookBooks.aggregate([
        authorIdMatcher(id),
        authorLookup,
        commentsLookup,
    ])
    return await paginator(aggregate, aggregateOptions(filters.page, filters.sortBy))
}

const getUserLikedCookBooks = async (id, filters) => {
    if (!id)
        return false
    if (!filters)
        filters = {page: 1}
    const user = (await getUser(id))[0]
    const likes = user?.likes?.cookBooks || []

    const aggregate = CookBooks.aggregate([
        idInRangeMatcher(likes),
        authorLookup,
        commentsLookup,
    ])
    return await paginator(aggregate, aggregateOptions(filters.page, filters.sortBy))
}

const getUserRecipes = async (id, filters) => {
    if(!id)
        return false
    if(!filters?.page)
        filters = {...filters, page:1}
    const aggregate = Recipes.aggregate([
        authorIdMatcher(id),
        authorLookup,
        commentsLookup
    ])
    return await paginator(aggregate, aggregateOptions(filters.page, filters.sortBy))
}
const getUserLikedRecipes = async (id, filters) => {
    if(!id)
        return false
    if(!filters?.page)
        filters = {...filters, page:1}
    const user = (await getUser(id))[0]
    const likes = user?.likes?.recipes || []
    const aggregate = Recipes.aggregate([
        idInRangeMatcher(likes),
        authorLookup,
        commentsLookup
    ])
    return await paginator(aggregate, aggregateOptions(filters.page, filters.sortBy))
}

module.exports = {
    getUserForLogin,
    getUserLikedRecipes,
    getUserRecipes,
    getUserLikedCookBooks,
    getUserCookBooks,
    getUser
}