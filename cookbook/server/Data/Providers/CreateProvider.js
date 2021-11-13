const {COMMENT_FIELDS} = require("../ConstantsProvider");
const {COMMON} = require("../ConstantsProvider");
const {USER_FIELDS} = require("../ConstantsProvider");
const {RECIPE_FIELDS} = require("../ConstantsProvider");
const {COOKBOOK_FIELDS} = require("../ConstantsProvider");
const {Comments} = require("../../models/modelsExporter");
const {StartProfileImage, StartProfileName, StartProfileSname} = require("../utils/DataConstants");
const {Users, CookBooks, Recipes} = require("../../models/modelsExporter")
const { array } = require('prop-types');
const { ecranize } = require('./utils/ecranizer');
let pool = null;

createUser = async (user) => {
    if (!user)
        return false

    const newUser = {
        name: {first: StartProfileName, last: StartProfileSname},
        desc: "",
        image: StartProfileImage,
        ...user
    }

    const result = await pool.query(`
    select * from create_user('${ecranize(newUser.name.first)}',
                    '${ecranize(newUser.name.last)}',
                    '${newUser.email}',
                    '${newUser.image}',
                    '${newUser.password}',
                    '${newUser.salt}',
                    '${ecranize(newUser.desc)}'
                    );`)
    return Number(result.rows[0].create_user);
}
createCookBook = async (inputCookBook) => {
    if (!inputCookBook)
        return false
    const recipes = inputCookBook.recipesIds
    const cookBook = {
        image: "",
        filters: "000",
        creationDate: new Date(),
        author: 1,
        name: "",
        desc: "",
        ...inputCookBook,
        views: 0,
    }
    if(typeof cookBook.filters === 'object')
    {
        let arr = [0,0,0]
        if(cookBook.filters.indexOf('vegeterian') !== -1)
            arr[0]=1
        if(cookBook.filters.indexOf('noMilk') !== -1)
            arr[1]=1
        if(cookBook.filters.indexOf('noEggs') !== -1)
            arr[2]=1
        cookBook.filters = arr.join('')
    }
    const result = await pool.query(`
    select * from create_cookbook(
                    '${cookBook.views}',
                    '${cookBook.image}',
                    'b${cookBook.filters}',
                    '${new Date(Number(cookBook.creationDate)).toUTCString()}',
                    '${cookBook.author}',
                    '${ecranize(cookBook.name)}',
                    '${ecranize(cookBook.desc)}'
                    );`)
    if(Number(result.rows[0].create_cookbook)){
        const query = `call add_recipes_to_cookbook(${result.rows[0].create_cookbook}, '{${recipes.join(',')}}')`
        await pool.query(query)
    }
    return Number(result.rows[0].create_cookbook);
}
createRecipe = async (inputRecipe) => {
    if (!inputRecipe)
        return false
    const recipe = {
        creationDate: new Date(),
        author: 1,
        cookTime: 1000,
        ingredients: JSON.stringify([]),
        directions: JSON.stringify([]),
        ...inputRecipe,
        views: 0,
    }

    if(typeof recipe.ingredients !== 'string')
    {
        recipe.ingredients = recipe.ingredients.map(item => ecranize(item))
        recipe.ingredients = JSON.stringify(recipe.ingredients)
    }
    if(typeof recipe.directions !== 'string'){
        recipe.directions = recipe.directions.map(item => ecranize(item))
        recipe.directions = JSON.stringify(recipe.directions)
    }
    const query = `
    select * from create_recipe(
                    '${recipe.views}',
                    '${recipe.image}',
                    '${recipe.cookTime}',
                    '${new Date(Number(recipe.creationDate)).toUTCString()}',
                    '${recipe.author}',
                    '${ecranize(recipe.name)}',
                    '${ecranize(recipe.desc)}',
                    '${recipe.ingredients}',
                    '${recipe.directions}'
                    );`
    const result = await pool.query(query)
    return Number(result.rows[0].create_recipe);
}

addComment = async (prop) => {
    if (!prop)
        return false
    try {
        //const commentId = (await Comments.find({}).sort({_id: -1}).limit(1))?.[0]?._doc?._id + 1 || 1;
        const newComment = {
            ...prop,
        }
        if(newComment.itemType === COMMON.COOKBOOK){
            newComment.cookbook = newComment.itemId;
            newComment.recipe = -1;
        } else {
            newComment.cookbook = -1;
            newComment.recipe = newComment.itemId;
        }
        newComment.date = new Date();
        const query = `
        select * from add_comment(
                    '${Number(newComment.author)}',
                    '${Number(newComment.recipe)}',
                    '${Number(newComment.cookbook)}',
                    '${newComment.date.toUTCString()}',
                    '${ecranize(newComment.text)}'
                    );`
        const result = await pool.query(query)
        return Number(result.rows[0].add_comment);
    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = (_pool)=>{
    if(!_pool)
        throw new Error("Create provider error: no pool injected")
    pool = _pool;
    return {createUser, createCookBook, createRecipe, addComment}
}