const {getPassword} = require("../../JWT/PasswordHasher");
const {Users} = require("../../models/modelsExporter");
const {USER_FIELDS} = require("../ConstantsProvider");
const {Recipes} = require("../../models/modelsExporter");
const {CookBooks} = require("../../models/modelsExporter");
const {checkFieldWrapper} = require("./../utils/fieldChecker");

const checkField = checkFieldWrapper(USER_FIELDS)

const updateRecipe = async (inputRecipe) => {
    if(!inputRecipe) return false
    return !!(await Recipes.updateOne(
        {_id: Number(inputRecipe._id)},
        inputRecipe
    )).nModified;
}

const updateCookBook = async (inputCookBook) => {
    if(!inputCookBook) return false
    return !!(await CookBooks.updateOne(
        {_id: Number(inputCookBook._id)},
        inputCookBook
    )).nModified;
}


const updateUser = async (id, field, value) => {
    if(!id || !field || !value)
        return false
    if (field === USER_FIELDS.password) {
        const {hash, salt} = getPassword(value)
        return !!(await Users.updateOne(
            {_id: Number(id)},
            {password: hash, salt: salt}
        )).nModified;
    }
    if (checkField(field)) {
        return !!(await Users.updateOne(
            {_id: Number(id)},
            {$set: {[field]: value}}
        )).nModified;
    }
    return false
}
module.exports = {updateRecipe, updateCookBook, updateUser}
