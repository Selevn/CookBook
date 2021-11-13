const cloudinary = require("../Cloudinary/cloudinary");

const express = require("express");
const removeFiles = require("./utils/removeFile");
const {createCookBook} = require("../Data/dataProvider");
const {createRecipe} = require("../Data/dataProvider");
const {updateRecipe} = require("../Data/dataProvider");
const {RECIPE_FIELDS} = require("../../src/constants");
const {updateCookBook} = require("../Data/dataProvider");
const {COOKBOOK_FIELDS} = require("../../src/constants");
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
            let createRecipeFlag;
            let newId;
            try {
                const forRemove = [];
                const recipe = {...req.body}

                //newId = (await createRecipe({}));

                const uploadedFile = await cloudinary.uploader.upload(req.files['image'][0].path)
                forRemove.push(req.files['image'][0].path)
                recipe[RECIPE_FIELDS.image] = uploadedFile.secure_url
                recipe[RECIPE_FIELDS.cloudinary_id] = uploadedFile.public_id
                recipe[RECIPE_FIELDS.images] = []
                recipe[RECIPE_FIELDS.secondary_cloudinary_ids] = []
                if (req.files['gallery']) {
                    const promisesArray = []
                    req.files['gallery'].forEach((file) => {
                        promisesArray.push(cloudinary.uploader.upload(file.path))
                        forRemove.push(file.path)
                    })
                    await Promise.all(promisesArray).then(values=>{
                        values.forEach(uploadedFile => {
                            recipe[RECIPE_FIELDS.images].push(uploadedFile.secure_url)
                            recipe[RECIPE_FIELDS.secondary_cloudinary_ids].push(uploadedFile.public_id)
                        })
                    })
                }
                removeFiles(forRemove)
                //recipe[RECIPE_FIELDS.ID] = newId;
                recipe[RECIPE_FIELDS.directions] = JSON.parse(recipe[RECIPE_FIELDS.directions])
                recipe[RECIPE_FIELDS.ingredients] = JSON.parse(recipe[RECIPE_FIELDS.ingredients])
                createRecipeFlag = await createRecipe(recipe);
            } catch (e) {
                console.log(e)
                createRecipeFlag = false;
            }
            res.json({
                success: !!createRecipeFlag,
                id: createRecipeFlag
            })
        })

    router.post(RELATIVE_ROUTES.NEW_COOKBOOK,
        passwordMiddleware,
        cookBookUpload.single('image'),
        async function (req, res, next) {
            let createCookBookFlag;
            let uploadedFile, newId
            try {
                const cookBook = {...req.body}
                uploadedFile = await cloudinary.uploader.upload(req.file.path)
                removeFiles(req.file.path)
                cookBook[COOKBOOK_FIELDS.image] = uploadedFile.secure_url
                cookBook[COOKBOOK_FIELDS.cloudinary_id] = uploadedFile.public_id
                cookBook[COOKBOOK_FIELDS.recipesIds] = JSON.parse(req.body.recipesIds)
                cookBook[COOKBOOK_FIELDS.filters] = JSON.parse(req.body.filters)
                createCookBookFlag = await createCookBook(cookBook);
            } catch (e) {
                if(uploadedFile)
                    await cloudinary.uploader.destroy(uploadedFile.public_id)
                console.log(e)
                //todo:remove cookbook
                createCookBookFlag = false;
            }
            res.json({
                success: !!createCookBookFlag,
                id: createCookBookFlag
            })
        })
    return router
}
module.exports = Routing;