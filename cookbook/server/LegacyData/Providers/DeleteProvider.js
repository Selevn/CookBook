const {COMMENT_FIELDS} = require("../ConstantsProvider");
const {COMMON} = require("../ConstantsProvider");
const {USER_FIELDS} = require("../ConstantsProvider");
const {RECIPE_FIELDS} = require("../ConstantsProvider");
const {COOKBOOK_FIELDS} = require("../ConstantsProvider");
const {Comments} = require("../../models/modelsExporter");
const {Users, CookBooks, Recipes} = require("../../models/modelsExporter")

const deleteUser = async (id) => {
    if(!id) return false
const tasks = []
    tasks.push(CookBooks.deleteMany({[COOKBOOK_FIELDS.author]: id}))
    tasks.push(Recipes.deleteMany({[RECIPE_FIELDS.author]: id}))
    tasks.push(Comments.deleteMany({[COMMENT_FIELDS.author]: id}))
    const result = await Promise.all(tasks)
    return result && !!(await Users.deleteOne({[USER_FIELDS.ID]: id})).n
}
const blockUser = async (id) => {
    return id && !!(await Users.updateOne(
        {[USER_FIELDS.ID]: id},
        {[USER_FIELDS.isBlocked]: true}
    )).nModified
}
const unblockUser = async (id) => {
    return id && !!(await Users.updateOne(
        {[USER_FIELDS.ID]: id},
        {[USER_FIELDS.isBlocked]: false}
    )).nModified
}

const deleteCookBook = async (id) => {
    return id && !!(await CookBooks.deleteOne(
        {[COOKBOOK_FIELDS.ID]: id}
    )).n
}
const deleteRecipe = async (id) => {
    return id && !!(await Recipes.deleteOne(
        {[RECIPE_FIELDS.ID]: id}
    )).n
}

const deleteComment = async (id) => {
    if (!id) return false
    let flag = true;
    let operationResult;
    const comment = (await Comments.find({[COMMENT_FIELDS.ID]: id}))[0]?._doc
    if (!comment) return false
    operationResult = (await Users.updateOne(
        {_id: Number(comment[COMMENT_FIELDS.author])},
        {$pull: {[USER_FIELDS.comments]: Number(id)}}
    ))
    flag = flag && !!operationResult.nModified
    if (comment[COMMENT_FIELDS.itemType] === COMMON.RECIPE) {
        operationResult = await Recipes.updateOne(
            {_id: Number(comment[COMMENT_FIELDS.itemId])},
            {$pull: {[RECIPE_FIELDS.commentsIds]: Number(id)}}
        )
        flag = flag && !!operationResult.nModified
    }
    if (comment[COMMENT_FIELDS.itemType] === COMMON.COOKBOOK) {
        const books = await CookBooks.find({})
        operationResult = await CookBooks.updateOne(
            {_id: Number(comment[COMMENT_FIELDS.itemId])},
            {$pull: {[COOKBOOK_FIELDS.commentsIds]: Number(id)}}
        )

        flag = flag && !!operationResult.nModified
    }

    operationResult = await Comments.deleteOne({[COMMENT_FIELDS.ID]: id})
    flag = flag && !!operationResult.n
    return flag;
}

module.exports = {deleteUser, blockUser, deleteCookBook, deleteRecipe, deleteComment}