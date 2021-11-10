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
} = require("../../models/lookups");
const {Aggregator} = require("../utils/Aggregator");
const {COMMON} = require("../ConstantsProvider");
const {paginator} = require("../utils/paginator");
const { cookBookMapper, recipeMapper } = require('./mappers');

let pool = null;
const limit = 15;
const aggregateOptions = Aggregator(COMMON);
getCookBooks = async (filters) => {
    let _filter;
    if (!filters)
        filters = {}
    else
    {
        const bitMap = [0,0,0];
        for (const filter in filters) {
            if (filters[filter] == 'vegetables')
                bitMap[0] = 1;
            if (filters[filter] == 'noMilk')
                bitMap[1] = 1;
            if (filters[filter] == 'noEggs')
                bitMap[2] = 1;
        }
        _filter = bitMap.join('')
    }
    if(!_filter)
        _filter = null
    let _hideMy;
    if (filters.hideMy) {
        _hideMy = 1;
    }
    else
        _hideMy = -1;
    let page = Number(filters.page) || 0;

    const query = `
        select * from get_cookbooks(
                    '${Number(limit)}',
                    '${page}',
                    '${Number(filters.sortBy) || 0}',
                    ${_filter?"'"+_filter+"'":null},
                    '${_hideMy}',
                    ${filters.searchString?"'"+filters.searchString+"'" : null}
                    );`
    //console.log(query);
    const result = await pool.query(query)

    const {getCookbooksCount} = require('./CountProviders')(pool)
    const count = await getCookbooksCount();
    result.rows.forEach((item)=>cookBookMapper(item))

    const out = {
        docs:result.rows,
        total:count,
        nextPage: count-((page-1) * limit) > 0?page+1:page,
        hasNextPage: count-(page * limit) > 0,
    }
    return out;
}
getCookBook = async (id) => {
    const query = `
        select * from get_cookbook(${id});`
    const result = await pool.query(query)
    if(result.rows.length === 0)
        return [null];
    result.rows[0] = cookBookMapper(result.rows[0])
    return result.rows
}

getRecipe = async (id) => {
    const query = `
        select * from get_recipe(${id});`
    const result = await pool.query(query)
    if(result.rows.length === 0)
        return [null];
    result.rows[0] = recipeMapper(result.rows[0])
    return result.rows
}
getRecipes = async (filter) => {
    let limit = 15, page = 0, sortBy = 0, _filter, hidemy, searchString;
    page = filter?.page || page;
    sortBy = filter?.sortBy || sortBy;

    if (!filter) {
        filter = {
            cookTime: COMMON.ALLCONSTANT
        }
    }

    if (filter.cookTime && filter.cookTime !== COMMON.ALLCONSTANT) {
        _filter = "'"+filter.cookTime+"'";
    }
    else{
        _filter = null
    }
    //todo: get my id!
    if (filter.hideMy == 'true') {
        hidemy = -1
    }
    else
    {
        hidemy = -1;
    }
    if (filter.ids) {
        const query = `
        select * from get_recipes_by_range_of_ids(
                    ARRAY ${filter.ids}
                    );`
        const result = await pool.query(query)
        result.rows.forEach((item)=>recipeMapper(item))

        const out = {
            docs: result.rows.slice(page*limit, limit),
            total: result.rows.length,
            nextPage: result.rows.length-((page-1) * limit) > 0?page+1:page,
            hasNextPage: result.rows.length-(page * limit) > 0,
        }
        return out;
    }
    if (filter.cookbookId) {
        const query = `
        select * from get_recipes_by_cookbook(
                    limit,
                    page,
                    ${filter.cookbookId}
                    );`
        const result = await pool.query(query)
        result.rows.forEach((item)=>recipeMapper(item))
        const out = {
            docs: result.rows.slice(page*limit, limit),
            total: result.rows.length,
            nextPage: result.rows.length-((page-1) * limit) > 0?page+1:page,
            hasNextPage: result.rows.length-(page * limit) > 0,
        }
        return out;
    }
    if (filter.searchString) {
        searchString = "'"+filter.searchString+"'"
    }
    else{
        searchString = null;
    }

    const query = `
        select * from get_recipes(
                    ${limit},
                    ${page},
                    ${sortBy},
                    ${_filter},
                    ${hidemy},
                    ${searchString}
                    );`
    //console.log(query);
    const result = await pool.query(query)

    const {getRecipesCount} = require('./CountProviders')(pool)
    const count = await getRecipesCount();

    result.rows.forEach((item)=>recipeMapper(item))
    const out = {
        docs:result.rows,
        total:count,
        nextPage: count-((page-1) * limit) > 0?page+1:page,
        hasNextPage: count-(page * limit) > 0,
    }
    return out;

    //return await paginator(aggregate, aggregateOptions(filter.page, filter.sortBy))
}

getComments = async (filter) => {

    let type, item, limit = 15, page = 0;
    if (!filter)
        return false

    if (filter.type === COMMON.COOKBOOK) {
        type = 1
    }
    else if (filter.type === COMMON.RECIPE) {
        type = 0
    }
    else return {docs: null}
    page = filter?.page || page
    item = Number(filter.itemId)

    const query = `
        select * from get_comments(
                    ${item},
                    ${type},
                    ${limit},
                    ${page}
                    );`
    const result = await pool.query(query)
    const count = (await pool.query(`select * from get_comments_count(${item}, ${type})`)).rows[0].get_comments_count

    const out = {
        docs:result.rows,
        total:count,
        nextPage: count-((page-1) * limit) > 0?page+1:page,
        hasNextPage: count-(page * limit) > 0,
    }
    return out;
}
module.exports = (_pool)=>{
    if(!_pool)
        throw new Error("Get provider error: no pool injected")
    pool = _pool;
    return {getCookBooks, getCookBook, getComments, getRecipes, getRecipe}
}