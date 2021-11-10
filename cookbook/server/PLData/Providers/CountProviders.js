const {Users, CookBooks, Recipes} = require("../../models/modelsExporter")

let pool = null;
const getUsersCount = async () => {
    const response = await pool.query('select * from get_users_count()')
    const result = response.rows[0].get_users_count;
    return Number(result);
}
const getCookbooksCount = async () => {
    const response = await pool.query('select * from get_cookbooks_count()')
    const result = response.rows[0].get_cookbooks_count;
    return Number(result);
}
const getRecipesCount = async () => {
    const response = await pool.query('select * from get_users_count()')
    const result = response.rows[0].get_users_count;
    return Number(result);
}

module.exports = (_pool)=>{
    if(!_pool)
        throw new Error("Count provider error: no pool injected")
    pool = _pool;
    return {getUsersCount, getCookbooksCount, getRecipesCount}
}
