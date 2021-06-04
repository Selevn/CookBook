const {Comments, Recipes, CookBooks} = require("../../models/modelsExporter");
const {
    idInRangeMatcher,
    cookTimeFilter,
    _idMatcher,
    hideMyFilter,
    filtersMatcher,
    nameLkeMatcher,
    authorLookup,
    commentsLookup,
    recipesLookUp
} = require("../../models/lookups");
const {Aggregator} = require("../utils/Aggregator");
const {COMMON} = require("../ConstantsProvider");
const {paginator} = require("../utils/paginator");

const aggregateOptions = Aggregator(COMMON);
getCookBooks = async (filters) => {
    if (!filters)
        filters = {}
    const pipe = [
        recipesLookUp,
        authorLookup,
        commentsLookup,
    ]
    let aggregate;
    const filterArr = []
    for (const filter in filters) {
        if (filters[filter] == 'true')
            filterArr.push(filter)
    }
    if (filters.hideMy) {
        pipe.unshift(hideMyFilter(filters.hideMy))
    }
    if (filterArr.length !== 0)
        pipe.unshift(filtersMatcher(filterArr))
    if (filters.searchString) {
        pipe.unshift(nameLkeMatcher(filters.searchString))
    }
    aggregate = CookBooks.aggregate(pipe)
    return await paginator(aggregate, aggregateOptions(filters.page, filters.sortBy))
}
getCookBook = async (id) => {
    return CookBooks.aggregate([
        _idMatcher(id),
        authorLookup
    ])
}

getRecipe = async (id) => {
    return Recipes.aggregate([
        _idMatcher(id),
        authorLookup,
        commentsLookup,
    ]);
}
getRecipes = async (filter) => {
    if (!filter) {
        filter = {
            cookTime: COMMON.ALLCONSTANT
        }
    }
    let pipe = [authorLookup]
    let aggregate;
    if (filter.cookTime && filter.cookTime !== COMMON.ALLCONSTANT) {
        pipe.unshift(cookTimeFilter(filter.cookTime))
    }
    if (filter.hideMy == 'true') {
        pipe.unshift(hideMyFilter(filter.hideMy))
    }
    if (filter.ids) {
        pipe.unshift(idInRangeMatcher(JSON.parse(filter.ids)))
    }
    if (filter.cookbookId) {
        const cookbook = (await getCookBook(filter.cookbookId))[0]
        pipe.unshift(idInRangeMatcher(cookbook.recipesIds))
    }
    if (filter.searchString) {
        pipe.unshift(nameLkeMatcher(filter.searchString))
    }
    aggregate = Recipes.aggregate(pipe)
    return await paginator(aggregate, aggregateOptions(filter.page, filter.sortBy))
}

getComments = async (filter) => {

    if (!filter)
        return false

    let item, aggregate, pipe = [authorLookup];

    if (filter.type === COMMON.COOKBOOK) {
        item = await getCookBook(filter.itemId);
    }
    if (filter.type === COMMON.RECIPE) {
        item = await getRecipe(filter.itemId);
    }
    item?.[0] && pipe.unshift(idInRangeMatcher(item[0].commentsIds))
    if (!item?.[0])
        return false
    aggregate = Comments.aggregate(pipe)
    return await paginator(aggregate, aggregateOptions(filter.page))
}
module.exports = {getCookBooks, getCookBook, getComments, getRecipes, getRecipe}