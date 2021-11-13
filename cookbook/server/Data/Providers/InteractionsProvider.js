const {getUser} = require("./GetUserDataProviders");
const {Users} = require("../../models/modelsExporter");
const {RECIPE_FIELDS} = require("../ConstantsProvider");
const {COOKBOOK_FIELDS} = require("../ConstantsProvider");
const {Recipes} = require("../../models/modelsExporter");
const {CookBooks} = require("../../models/modelsExporter");
const {COMMON} = require("../ConstantsProvider");
const { cookBookMapper } = require('./mappers');
let pool;


const likeCookBook = async (userId, id) => {
    const query = `
        call like_cookbook(${userId},${id})`
     
    await pool.query(query)
    return true
}
const likeRecipe = async (userId, id) => {
    const query = `
        call like_recipe(${userId},${id})`
     
    await pool.query(query)
    return true
}

const visitItem = async (id, type) => {
    if(!id || !type)
        return false
    if (type === COMMON.COOKBOOK)
        await pool.query(`call visit_cookbook(${id})`)
    if (type === COMMON.RECIPE)
        await pool.query(`call visit_recipe(${id})`)

    return true;

}

module.exports = (_pool)=>{
    if(!_pool){
        throw new Error('Interactions provider: no pool injected!')
    }
    pool = _pool
    return {visitItem, likeRecipe, likeCookBook}}