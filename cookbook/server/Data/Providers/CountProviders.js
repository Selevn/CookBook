const {Users, CookBooks, Recipes} = require("../../models/modelsExporter")

const getUsersCount = async () => {
    return Users.countDocuments({});
}
const getCookbooksCount = async () => {
    return CookBooks.countDocuments({});
}
const getRecipesCount = async () => {
    return Recipes.countDocuments({});
}

module.exports = {getUsersCount, getCookbooksCount, getRecipesCount}