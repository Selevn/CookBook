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
const { sorter } = require('./utils/sorter');
const { userMapper, cookBookMapper, recipeMapper } = require('./mappers');
let pool = null;


const getUser = async (id) => {
    const query = `
        select * from get_user_all_data(
                    ${id}
                    );`
     
    const result = await pool.query(query)
    result.rows = result.rows.map(item => userMapper(item))
    return result.rows[0]
}

const getUserForLogin = async (email) => {
    const query = `
        select * from get_user_for_login(
                    '${email}'
                    );`
     
    const result = await pool.query(query)
    result.rows = result.rows.map(item => userMapper(item))
    const user = result.rows[0]
    if(!user)
        return result.rows;
    const likedRecipesQuery = `
        select * from get_all_user_liked_recipes(
                    '${user._id}'
                    );`
    const likedRecipesQueryResult = await pool.query(likedRecipesQuery)

    const likedCookBooksQuery = `
        select * from get_all_user_liked_cookbooks(
                    '${user._id}'
                    );`
    const likedCookBooksQueryResult = await pool.query(likedCookBooksQuery)


    result.rows[0].likes = {
        recipes: likedRecipesQueryResult.rows.map(item => item._id),
        cookBooks: likedCookBooksQueryResult.rows.map(item=>item._id)
    }

    return result.rows
}

const getUserCookBooks = async (id, filters) => {
    let page = filters.page
    let limit = 15;
    if (!filters)
        filters = {page: 1}
    const query = `
        select * from get_user_cookbooks(
                    '${id}',
                    '${limit}',
                    '${filters.page-1}'
                    );`
     
    const result = await pool.query(query)
    result.rows = result.rows.map(item => cookBookMapper(item))

    const getUserCookBooks = `
        select * from get_user_cookbooks_count(
                    '${id}',
                    '${limit}',
                    '${filters.page-1}'
                    );`
     
    const getUserCookbooksCount = await pool.query(getUserCookBooks)
    const count = getUserCookbooksCount.rows[0].get_user_cookbooks_count


    const out = {
        docs:result.rows,
        total:count,
        nextPage: count-((page-1) * limit) > 0?page+1:page,
        hasNextPage: count-(page * limit) > 0,
    }

    return out
}

const getUserLikedCookBooks = async (id, filters) => {
    let limit = 15;
    let page = filters.page
    if (!filters)
        filters = {page: 1}
    const query = `
        select * from get_user_liked_cookbooks(
                    '${id}',
                    '${limit}',
                    '${filters.page-1}'
                    );`
     
    const result = await pool.query(query)
    result.rows = result.rows.map(item => cookBookMapper(item))

    const getUserCookBooks = `
        select * from get_user_liked_cookbooks_count(
                    '${id}',
                    '${limit}',
                    '${filters.page-1}'
                    );`
     
    const getUserCookbooksCount = await pool.query(getUserCookBooks)
    const count = getUserCookbooksCount.rows[0].get_user_liked_cookbooks_count

    const out = {
        docs:result.rows,
        total:count,
        nextPage: count-((page-1) * limit) > 0?page+1:page,
        hasNextPage: count-(page * limit) > 0,
    }

    return out
}

const getUserRecipes = async (id, filters) => {
    let page = filters.page

    let limit = 15;
    if (!filters)
        filters = {page: 1}
    const query = `
        select * from get_user_recipes(
                    '${id}',
                    '${limit}',
                    '${filters.page-1}'
                    );`
    const result = await pool.query(query)
    result.rows = result.rows.map(item => recipeMapper(item))

    const getUserCookBooks = `
        select * from get_user_recipes_count(
                    '${id}',
                    '${limit}',
                    '${filters.page-1}'
                    );`
     
    const getUserCookbooksCount = await pool.query(getUserCookBooks)
    const count = getUserCookbooksCount.rows[0].get_user_recipes_count


    const out = {
        docs:result.rows,
        total:count,
        nextPage: count-((page-1) * limit) > 0?page+1:page,
        hasNextPage: count-(page * limit) > 0,
    }

    return out
}
const getUserLikedRecipes = async (id, filters) => {
    let page = filters.page

    let limit = 15;
    if (!filters)
        filters = {page: 1}
    const query = `
        select * from get_user_liked_recipes(
                    '${id}',
                    '${limit}',
                    '${filters.page-1}'
                    );`
     
    const result = await pool.query(query)
    result.rows = result.rows.map(item => recipeMapper(item))

    const getUserCookBooks = `
        select * from get_user_liked_recipes_count(
                    '${id}',
                    '${limit}',
                    '${filters.page-1}'
                    );`
     
    const getUserCookbooksCount = await pool.query(getUserCookBooks)
    const count = getUserCookbooksCount.rows[0].get_user_liked_recipes_count


    const out = {
        docs:result.rows,
        total:count,
        nextPage: count-((page-1) * limit) > 0?page+1:page,
        hasNextPage: count-(page * limit) > 0,
    }

    return out
}


module.exports = (_pool)=>{
    if(!_pool)
        throw new Error("Get provider error: no pool injected")
    pool = _pool;
    return {getUserForLogin,
        getUserLikedRecipes,
        getUserRecipes,
        getUserLikedCookBooks,
        getUserCookBooks,
        getUser}
}