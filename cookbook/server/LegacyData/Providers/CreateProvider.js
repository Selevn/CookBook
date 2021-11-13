const {COMMENT_FIELDS} = require("../ConstantsProvider");
const {COMMON} = require("../ConstantsProvider");
const {USER_FIELDS} = require("../ConstantsProvider");
const {RECIPE_FIELDS} = require("../ConstantsProvider");
const {COOKBOOK_FIELDS} = require("../ConstantsProvider");
const {Comments} = require("../../models/modelsExporter");
const {StartProfileImage, StartProfileName, StartProfileSname} = require("../utils/DataConstants");
const {Users, CookBooks, Recipes} = require("../../models/modelsExporter")

createUser = async (user) => {
    if (!user)
        return false
    const newId = (await Users.find({}).sort({_id: -1}).limit(1))?.[0]?._doc?._id + 1 || 1
    const newUser = {
        name: {first: StartProfileName, last: StartProfileSname},
        desc: "",
        image: StartProfileImage,
        _id: newId,
        ...user
    }
    return !!(await (new Users(newUser)).save()) && newId;
}
createCookBook = async (inputCookBook) => {
    if (!inputCookBook)
        return false
    const newId = (await CookBooks.find({}).sort({_id: -1}).limit(1))?.[0]?._doc?._id + 1 || 1
    const cookBook = {
        ...inputCookBook,
        _id: newId,
        views: 0,
    }
    return !!(await (new CookBooks(cookBook)).save()) && newId;
}
createRecipe = async (inputRecipe) => {
    if (!inputRecipe)
        return false
    const newId = (await Recipes.find({}).sort({_id: -1}).limit(1))?.[0]?._doc?._id + 1 || 1
    const recipe = {
        ...inputRecipe,
        _id: newId,
        views: 0,
    }
    return !!(await (new Recipes(recipe)).save()) && newId;
}

addComment = async (prop) => {
    if (!prop)
        return false
    const type = prop[COMMENT_FIELDS.itemType]
    const userId = prop[COMMENT_FIELDS.author]
    const itemId = prop[COMMENT_FIELDS.itemId]

    //{userId, type, itemId, comment} = prop
    try {
        const commentId = (await Comments.find({}).sort({_id: -1}).limit(1))?.[0]?._doc?._id + 1 || 1;
        const newComment = {
            ...prop,
        }
        const saveComment = ((new Comments({...newComment, [COMMENT_FIELDS.ID]: commentId})).save());
        const updateUser = Users.updateOne(
            {_id: Number(userId)},
            {$push: {[USER_FIELDS.comments]: commentId}}
        )
        let updateItem;
        if (type === COMMON.RECIPE) {
            updateItem = Recipes.updateOne(
                {_id: Number(itemId)},
                {$push: {[RECIPE_FIELDS.commentsIds]: commentId}}
            )
        } else {
            updateItem = CookBooks.updateOne(
                {_id: Number(itemId)},
                {$push: {[COOKBOOK_FIELDS.commentsIds]: commentId}}
            )
        }
        const result = await Promise.all([saveComment, updateUser, updateItem])
        return Array.isArray(result);
    } catch (e) {
        return false;
    }
}

module.exports = {createUser, createCookBook, createRecipe, addComment}