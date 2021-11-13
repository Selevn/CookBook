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
const { cookBookMapper, recipeMapper, commentMapper } = require('./mappers');
const { sorter } = require('./utils/sorter');
const { ecranize } = require('./utils/ecranizer');

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
        if (filters['vegeterian'] == 'true')
            bitMap[0] = 1;
        if (filters['noMilk'] == 'true')
            bitMap[1] = 1;
        if (filters['noEggs'] == 'true')
            bitMap[2] = 1;
        _filter = bitMap.join('')
    }
    if(_filter === '000')
        _filter = null
    if(!_filter)
        _filter = null
    let _hideMy;
    if (filters.hideMy) {
        _hideMy = Number(filters.hideMy) || -1;
    }
    else
        _hideMy = -1;
    let page = Number(filters.page) || 1;
    page = Number(page)

    const query = `
        select * from get_cookbooks(
                    '${Number(limit)}',
                    '${page-1}',
                    '${sorter(filters.sortBy)}',
                    ${_filter?"'"+_filter+"'":null},
                    '${_hideMy}',
                    ${filters.searchString?"'"+ecranize(filters.searchString)+"'" : null}
                    );`
     
    const result = await pool.query(query)

    const countQuery = `
        select * from get_cookbooks_count(
                    '${Number(limit)}',
                    '${page-1}',
                    '${sorter(filters.sortBy)}',
                    ${_filter?"'"+_filter+"'":null},
                    '${_hideMy}',
                    ${filters.searchString?"'"+ecranize(filters.searchString)+"'" : null}
                    );`
    const countResult = await pool.query(countQuery)
    const count = countResult.rows[0].get_cookbooks_count;

    result.rows = result.rows.map((item)=>cookBookMapper(item))

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
    const filters = {}
    filters['vegeterian'] = result.rows[0].filters[0] === '1'
    filters['noMilk'] = result.rows[0].filters[1] === '1'
    filters['noEggs'] = result.rows[0].filters[2] === '1'
    result.rows[0].filters = filters;
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
    let limit = 15, page = 1, sortBy = 0, _filter, hidemy, searchString;
    page = filter?.page || page;
    page = Number(page)
    sortBy = sorter(filter?.sortBy);

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
    if (filter.hideMy) {
        hidemy = Number(filter.hideMy) || -1
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
        result.rows = result.rows.map((item)=>recipeMapper(item))

        const out = {
            docs: result.rows.slice((page-1)*limit, limit),
            total: result.rows.length,
            nextPage: result.rows.length-((page-1) * limit) > 0?page+1:page,
            hasNextPage: result.rows.length-(page * limit) > 0,
        }
        return out;
    }
    if (filter.cookbookId) {
        const query = `
        select * from get_recipes_by_cookbook(
                    ${limit},
                    ${page-1},
                    ${filter.cookbookId}
                    );`
        const result = await pool.query(query)
        result.rows = result.rows.map((item)=>recipeMapper(item))
        const out = {
            docs: result.rows.slice((page-1)*limit, limit),
            total: result.rows.length,
            nextPage: result.rows.length-((page-1) * limit) > 0?page+1:page,
            hasNextPage: result.rows.length-(page * limit) > 0,
        }
        return out;
    }
    if (filter.searchString) {
        searchString = "'"+ecranize(filter.searchString)+"'"
    }
    else{
        searchString = null;
    }

    const query = `
        select * from get_recipes(
                    ${limit},
                    ${page-1},
                    ${sortBy},
                    ${_filter},
                    ${hidemy},
                    ${searchString}
                    );`
     
    const result = await pool.query(query)
    const countQuery = `
        select * from get_recipes_count(
                    ${limit},
                    ${page-1},
                    ${sortBy},
                    ${_filter},
                    ${hidemy},
                    ${searchString}
                    );`
    const countResult = await pool.query(countQuery)
    const count = countResult.rows[0].get_recipes_count


    result.rows = result.rows.map((item)=>recipeMapper(item))
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

    let type, item, limit = 15, page = 1;
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
    page = Number(page)

    item = Number(filter.itemId)

    const query = `
        select * from get_comments(
                    ${item},
                    ${type},
                    ${limit},
                    ${page-1}
                    );`
    const result = await pool.query(query)
    const count = (await pool.query(`select * from get_comments_count(${item}, ${type})`)).rows[0].get_comments_count
    result.rows = result.rows.map(item => commentMapper(item))
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