const {
    getUser,
    getUserForLogin,
    getUserCookBooks,
    getUserRecipes,
    getUserLikedCookBooks,
    getUserLikedRecipes
} = require('./Providers/GetUserDataProviders');
const { likeCookBook, likeRecipe, visitItem } = require('./Providers/InteractionsProvider');
const { updateUser, updateRecipe, updateCookBook } = require('./Providers/UpdateProvider');
const { deleteUser, blockUser, deleteCookBook, deleteRecipe, deleteComment } = require('./Providers/DeleteProvider');
const { getUsersStatistics } = require('./Providers/AdminStatistics');
const providerWrapper = (pool) => {

    const {getUsersStatistics} = require("./Providers/AdminStatistics");
    const {getCookBooks, getCookBook, getComments, getRecipes, getRecipe} = require("./Providers/GetProviders")(pool)
    const {getUserForLogin, getUser} = require("./Providers/GetUserDataProviders")(pool)
    const {likeCookBook, likeRecipe, visitItem} = require("./Providers/InteractionsProvider")(pool)
    const {createUser, createCookBook,createRecipe, addComment} = require("./Providers/CreateProvider")(pool)
    const {updateCookBook, updateRecipe, updateUser } = require("./Providers/UpdateProvider")(pool)
    const {deleteUser, blockUser, deleteCookBook, deleteRecipe, deleteComment} = require("./Providers/DeleteProvider")
    const {getUsersCount, getCookbooksCount, getRecipesCount} = require("./Providers/CountProviders")(pool)
    const {getUserCookBooks, getUserRecipes, getUserLikedCookBooks, getUserLikedRecipes} = require("./Providers/GetUserDataProviders")(pool)


    let exports = {};
    exports.getUser = getUser
    exports.addComment = addComment
    exports.getCookBooks = getCookBooks
    exports.getCookBook = getCookBook
    exports.createRecipe = createRecipe
    exports.getRecipes = getRecipes
    exports.getComments = getComments
    exports.getRecipe = getRecipe
    exports.getUserForLogin = getUserForLogin
    exports.createUser = createUser
    exports.createCookBook = createCookBook
    exports.likeCookBook = likeCookBook
    exports.likeRecipe = likeRecipe
    exports.visitItem = visitItem
    exports.updateUser = updateUser
    exports.updateRecipe = updateRecipe
    exports.updateCookBook = updateCookBook
    exports.deleteUser = deleteUser
    exports.blockUser = blockUser
    exports.deleteCookBook = deleteCookBook
    exports.deleteRecipe = deleteRecipe
    exports.deleteComment = deleteComment
    exports.getUsersCount = getUsersCount
    exports.getCookbooksCount = getCookbooksCount
    exports.getRecipesCount = getRecipesCount

    exports.getUserCookBooks = getUserCookBooks
    exports.getUserRecipes = getUserRecipes
    exports.getUserLikedCookBooks = getUserLikedCookBooks
    exports.getUserLikedRecipes = getUserLikedRecipes

    exports.getUsersStatistics = getUsersStatistics
    return exports
}

exports.providerWrapper = providerWrapper

if(global.pool){
    let pool = global.pool
    const {getUsersStatistics} = require("./Providers/AdminStatistics");
    const {getCookBooks, getCookBook, getComments, getRecipes, getRecipe} = require("./Providers/GetProviders")(pool)
    const {getUserForLogin, getUser} = require("./Providers/GetUserDataProviders")(pool)
    const {likeCookBook, likeRecipe, visitItem} = require("./Providers/InteractionsProvider")(pool)
    const {createUser, createCookBook,createRecipe, addComment} = require("./Providers/CreateProvider")(pool)
    const {updateCookBook, updateRecipe, updateUser } = require("./Providers/UpdateProvider")(pool)
    const {deleteUser, blockUser, deleteCookBook, deleteRecipe, deleteComment} = require("./Providers/DeleteProvider")
    const {getUsersCount, getCookbooksCount, getRecipesCount} = require("./Providers/CountProviders")(pool)
    const {getUserCookBooks, getUserRecipes, getUserLikedCookBooks, getUserLikedRecipes} = require("./Providers/GetUserDataProviders")(pool)

    exports.getUser = getUser
    exports.addComment = addComment
    exports.getCookBooks = getCookBooks
    exports.getCookBook = getCookBook
    exports.createRecipe = createRecipe
    exports.getRecipes = getRecipes
    exports.getComments = getComments
    exports.getRecipe = getRecipe
    exports.getUserForLogin = getUserForLogin
    exports.createUser = createUser
    exports.createCookBook = createCookBook
    exports.likeCookBook = likeCookBook
    exports.likeRecipe = likeRecipe
    exports.visitItem = visitItem
    exports.updateUser = updateUser
    exports.updateRecipe = updateRecipe
    exports.updateCookBook = updateCookBook
    exports.deleteUser = deleteUser
    exports.blockUser = blockUser
    exports.deleteCookBook = deleteCookBook
    exports.deleteRecipe = deleteRecipe
    exports.deleteComment = deleteComment
    exports.getUsersCount = getUsersCount
    exports.getCookbooksCount = getCookbooksCount
    exports.getRecipesCount = getRecipesCount

    exports.getUserCookBooks = getUserCookBooks
    exports.getUserRecipes = getUserRecipes
    exports.getUserLikedCookBooks = getUserLikedCookBooks
    exports.getUserLikedRecipes = getUserLikedRecipes

    exports.getUsersStatistics = getUsersStatistics
}