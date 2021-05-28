const express = require('express');
const renameFile = require("./utils/renameFile");
const {createCookBook} = require("../Data/dataProvider");
const {createRecipe} = require("../Data/dataProvider");
const {updateRecipe} = require("../Data/dataProvider");
const {RECIPE_FIELDS} = require("../../src/constants");
const {updateCookBook} = require("../Data/dataProvider");
const {COOKBOOK_FIELDS} = require("../../src/constants");
const {FOLDERS} = require("../../src/constants");
const {RELATIVE_ROUTES} = require("../../src/constants");
const {passportMiddlewareProvider} = require("../JWT/PasswordProvider");

function Routing(passport) {
    const passwordMiddleware = passportMiddlewareProvider(passport);
    const {cookBookUpload, recipeUpload} = require('../multerSettings')
    const router = express.Router();

    router.post(RELATIVE_ROUTES.NEW_RECIPE,
        passwordMiddleware,
        recipeUpload.fields([{name: 'image', maxCount: 1}, {name: 'gallery', maxCount: 8}]),
        async function (req, res, next) {
            let createRecipeFlag = false;
            let newId;
            try {
                const recipe = {...req.body}

                newId = (await createRecipe({}))._id;
                const oldName = req.files['image'][0].filename;
                const newName = `${newId}__${oldName}`;
                if (!renameFile(FOLDERS.RECIPES_IMAGES, oldName, newName)) {
                    res.send({
                        success: false
                    })
                    return
                }
                const secondaryFilesNames = []
                if (req.files['gallery']) {
                    req.files['gallery'].forEach((file, position) => {
                        const oldName = file.filename;
                        const newName = `${newId}_${position}_${oldName}`;
                        if (!renameFile(FOLDERS.RECIPES_IMAGES, oldName, newName, `${newId}_${position}_`))
                            throw new Error("Can't rename file")
                        secondaryFilesNames.push(newName)
                    })
                    recipe[RECIPE_FIELDS.images] = secondaryFilesNames.map(item => `/img/recipeImages/${item}`)
                }
                recipe[RECIPE_FIELDS.ID] = newId;
                recipe[RECIPE_FIELDS.directions] = JSON.parse(recipe[RECIPE_FIELDS.directions])
                recipe[RECIPE_FIELDS.ingredients] = JSON.parse(recipe[RECIPE_FIELDS.ingredients])
                recipe[RECIPE_FIELDS.image] = `/img/recipeImages/${newName}`
                createRecipeFlag = await updateRecipe(recipe);
            } catch (e) {
                console.log(e)
                createRecipeFlag = false;
            }
            res.json({
                success: !!createRecipeFlag,
                id: newId
            })
        })

    router.post(RELATIVE_ROUTES.NEW_COOKBOOK,
        passwordMiddleware,
        cookBookUpload.single('image'),
        async function (req, res, next) {
            let createCookBookFlag;
            const newId = (await createCookBook({}))._id;
            try {
                const cookBook = {...req.body}
                const oldName = req.file.filename;
                const newName = `${newId}__${oldName}`;
                if (!renameFile(FOLDERS.COOKBOOK_IMAGES, oldName, newName))
                    throw new Error("Can not rename file")
                cookBook[COOKBOOK_FIELDS.ID] = newId
                cookBook[COOKBOOK_FIELDS.image] = `/img/cookBookImages/${newName}`
                cookBook[COOKBOOK_FIELDS.recipesIds] = JSON.parse(req.body.recipesIds)
                cookBook[COOKBOOK_FIELDS.filters] = JSON.parse(req.body.filters)
                createCookBookFlag = await updateCookBook(cookBook);
                console.log(createCookBookFlag)
            } catch (e) {
                console.log(e)
                //todo:remove cookbook
                createCookBookFlag = false;
            }
            res.json({
                success: !!createCookBookFlag,
                id: newId
            })
        })
    return router
}
module.exports = Routing;