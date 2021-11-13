const {getUser} = require("./GetUserDataProviders");
const {Users} = require("../../models/modelsExporter");
const {RECIPE_FIELDS} = require("../ConstantsProvider");
const {COOKBOOK_FIELDS} = require("../ConstantsProvider");
const {Recipes} = require("../../models/modelsExporter");
const {CookBooks} = require("../../models/modelsExporter");
const {COMMON} = require("../ConstantsProvider");


const likeCookBook = async (userId, id) => {
    try {
        const user = (await getUser(userId))[0]
        if(!user) return false
        const likes = user?.likes?.recipes || []
        if (likes.includes(Number(id))) {
            //remove
            const updated = await CookBooks.updateOne({_id: Number(id)}, {$inc: {'likes': -1}})
            if(!updated.nModified) return false;
            await Users.updateOne(
                {_id: Number(userId)},
                {$pull: {"likes.cookBooks": Number(id)}}
            )
        } else {
            //add
            const updated = await CookBooks.updateOne({_id: Number(id)}, {$inc: {'likes': 1}})
            if(!updated.nModified) return false;
            await Users.updateOne(
                {_id: Number(userId)},
                {$push: {"likes.cookBooks": Number(id)}}
            )
        }
        return true;
    } catch (e) {
        return false;
    }
}
const likeRecipe = async (userId, id) => {
    try {
        const user = (await getUser(userId))[0]
        if(!user) return false
        const likes = user?.likes?.recipes || []
        if (likes.includes(Number(id))) {
            //remove
            const updated = await Recipes.updateOne({_id: Number(id)}, {$inc: {[RECIPE_FIELDS.likes]: -1}})
            if(!updated.nModified) return false;
            await Users.updateOne(
                {_id: Number(userId)},
                {$pull: {"likes.recipes": Number(id)}}
            )
        } else {
            //add
            const updated = await Recipes.updateOne({_id: Number(id)}, {$inc: {[RECIPE_FIELDS.likes]: 1}})
            if(!updated.nModified) return false;
            await Users.updateOne(
                {_id: Number(userId)},
                {$push: {"likes.recipes": Number(id)}}
            )
        }
        return true;
    } catch (e) {
        return false;
    }
}

const visitItem = async (id, type) => {
    if(!id || !type)
        return false
    try {
        if (type === COMMON.COOKBOOK)
            await CookBooks.updateOne({_id: Number(id)}, {$inc: {[COOKBOOK_FIELDS.views]: 1}})
        if (type === COMMON.RECIPE)
            await Recipes.updateOne({_id: Number(id)}, {$inc: {[RECIPE_FIELDS.views]: 1}})
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {visitItem, likeRecipe, likeCookBook}