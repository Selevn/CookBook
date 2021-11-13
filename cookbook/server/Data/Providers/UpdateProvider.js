const {getPassword} = require("../../JWT/PasswordHasher");
const {Users} = require("../../models/modelsExporter");
const {USER_FIELDS} = require("../ConstantsProvider");
const {Recipes} = require("../../models/modelsExporter");
const {CookBooks} = require("../../models/modelsExporter");
const {checkFieldWrapper} = require("./../utils/fieldChecker");
const { ecranize } = require('./utils/ecranizer');

const checkField = checkFieldWrapper(USER_FIELDS)
let pool = null;

const updateRecipe = async (inputRecipe) => {
    inputRecipe.ingredients = inputRecipe.ingredients.map(item => ecranize(item))
    inputRecipe.directions = inputRecipe.directions.map(item => ecranize(item))

    const query = `call update_recipe(
        ${Number(inputRecipe._id)},
        '${inputRecipe.image}',
        ${inputRecipe.cookTime},
        ${Number(inputRecipe.author)},
        '${ecranize(inputRecipe.name)}',
        '${ecranize(inputRecipe.desc)}',
        '${JSON.stringify(inputRecipe.ingredients)}',
        '${JSON.stringify(inputRecipe.directions)}'
    )`
    await pool.query(query)
    return true;
}

const updateCookBook = async (inputCookBook) => {
    const bitMap = [0,0,0];
    inputCookBook.filters.forEach(item => {
        if (item == 'vegeterian')
            bitMap[0] = 1;
        if (item == 'noMilk')
            bitMap[1] = 1;
        if (item == 'noEggs')
            bitMap[2] = 1;
    })
    const _filter = bitMap.join('')

    const query = `call update_cookbook(
        ${Number(inputCookBook._id)},
        '${inputCookBook.image}',
        'b${_filter}',
        ${Number(inputCookBook.author)},
        '${ecranize(inputCookBook.name)}',
        '${ecranize(inputCookBook.desc)}'
    )`
    await pool.query(query)
        const unlinkQuery = `call unlink_recipes_from_cookbook(${inputCookBook._id})`
        await pool.query(unlinkQuery)

        const addRecipesQuery = `call add_recipes_to_cookbook(${inputCookBook._id}, '{${inputCookBook.recipesIds.join(',')}}')`
        await pool.query(addRecipesQuery)

    return true;
}


const updateUser = async (id, field, value) => {
    let field_name;
    switch (field){
        case 'password': {field_name = "password"; break;}
        case 'salt': {field_name = "salt"; break;}
        case 'name.first': {field_name = "first_name"; break;}
        case 'name.last': {field_name = "last_name"; break;}
        case 'desc': {field_name = "desc"; break;}
        case 'image': {field_name = "image"; break;}
        case 'cloudinary_id': return true;
        default: return false;
    }
    const query = `call update_user_field(
        ${Number(id)},
        '${field_name}',
        '${ecranize(value)}'
    )`
    await pool.query(query)
    return true;
}
module.exports = (_pool)=>{
    if(!_pool){
        throw new Error("Update provider: no pool injected")
    }
    pool = _pool
    return {updateRecipe, updateCookBook, updateUser}}
