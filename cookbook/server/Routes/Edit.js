const cloudinary = require('../Cloudinary/cloudinary');

const express = require('express');
const removeFiles = require("./utils/removeFile");
const {getRecipe} = require("../Data/dataProvider");
const {getCookBook} = require("../Data/dataProvider");
const {USER_FIELDS} = require("../../src/constants");
const {getUser} = require("../Data/dataProvider");
const {updateRecipe} = require("../Data/dataProvider");
const {RECIPE_FIELDS} = require("../../src/constants");
const {updateCookBook} = require("../Data/dataProvider");
const {COOKBOOK_FIELDS} = require("../../src/constants");
const {updateUser} = require("../Data/dataProvider");
const {RELATIVE_ROUTES} = require("../../src/constants");
const {passportMiddlewareProvider} = require("../JWT/PasswordProvider");

function Routing(passport) {
    const passwordMiddleware = passportMiddlewareProvider(passport);
    const {cookBookUpload, recipeUpload, userUpload} = require('../multerSettings')

    const router = express.Router();

    router.post(RELATIVE_ROUTES.CHANGE_ACC_IMAGE,
        passwordMiddleware,
        userUpload.single('avatar'),
        async function (req, res, next) {
            let result = true;
            const userKey = (await getUser(req.body.id))[0].cloudinary_id;
            if(userKey)
                cloudinary.uploader.destroy(userKey)
            const uploadedFile = await cloudinary.uploader.upload(req.file.path)
            removeFiles(req.file.path)
            result = result && await updateUser(req.body.id, USER_FIELDS.image,uploadedFile.secure_url)
            result = result && await updateUser(req.body.id, USER_FIELDS.cloudinary_id,uploadedFile.public_id)
            res.json({
                success: result,
                img: uploadedFile.secure_url,
            })
        })

    router.post(RELATIVE_ROUTES.CHANGE_ACC,
        passwordMiddleware,
        async function (req, res, next) {
            await updateUser(req.body.id, req.body.field,req.body.value)
            res.json({
                success: true,
                value: req.body.value,
            })
        })

    router.post(RELATIVE_ROUTES.EDIT_RECIPE,
        passwordMiddleware,
        recipeUpload.fields([{ name: 'image', maxCount: 1 }, {name:'gallery', maxCount: 8}]),
        async function (req, res, next) {
            const id = req.body._id;
            const toRemove = [];
            let createRecipeFlag;
            let currentRecipe;
            if(req.files['image'] || req.files['gallery'])
                currentRecipe = (await getRecipe(id))[0]
            try{

                const recipe = {...req.body}
                if(req.files['image'])
                {
                    const recipeKey = currentRecipe.cloudinary_id
                    if(recipeKey)
                        cloudinary.uploader.destroy(recipeKey)
                    const uploadedFile = await cloudinary.uploader.upload(req.files['image'][0].path)
                    toRemove.push(req.files['image'][0].path)
                    recipe[RECIPE_FIELDS.image] = uploadedFile.secure_url
                    recipe[RECIPE_FIELDS.cloudinary_id] = uploadedFile.public_id
                }
                if(!req.files['image'])
                {
                    recipe[RECIPE_FIELDS.image] = req.body.image
                }

                if(req.files['gallery']){
                    const recipeKeys = currentRecipe.secondary_cloudinary_ids
                    if(recipeKeys)
                        recipeKeys.forEach((key) => {
                            cloudinary.uploader.destroy(key[0])
                        })

                    const promisesArray = []
                    recipe[RECIPE_FIELDS.images] = []
                    recipe[RECIPE_FIELDS.secondary_cloudinary_ids] = []
                    req.files['gallery'].forEach((file) => {
                        promisesArray.push(cloudinary.uploader.upload(file.path))
                        toRemove.push(file.path)
                    })
                    await Promise.all(promisesArray).then(values=>{
                        values.forEach(uploadedFile => {
                            recipe[RECIPE_FIELDS.images].push(uploadedFile.secure_url)
                            recipe[RECIPE_FIELDS.secondary_cloudinary_ids].push(uploadedFile.public_id)
                        })
                    })
                }
                if(!req.files['gallery'])
                {
                    recipe[RECIPE_FIELDS.images] = JSON.parse(req.body.images)
                }
                removeFiles(toRemove)
                recipe[RECIPE_FIELDS.directions] = JSON.parse(recipe[RECIPE_FIELDS.directions])
                recipe[RECIPE_FIELDS.ingredients] = JSON.parse(recipe[RECIPE_FIELDS.ingredients])
                createRecipeFlag = await updateRecipe(recipe);
            }
            catch(e){
                console.log(e)
                createRecipeFlag = false;
            }
            res.json({
                success: !!createRecipeFlag,
                id:id
            })
        })

    router.post(RELATIVE_ROUTES.EDIT_COOKBOOK,
        passwordMiddleware,
        cookBookUpload.single('image'),
        async function (req, res, next) {
            let createCookBookFlag = false;
            const id = req.body._id;
            try{
                const cookBook = {...req.body}
                if(req.file){
                    const cookBookKey = (await getCookBook(id))[0].cloudinary_id;
                    if(cookBookKey)
                        cloudinary.uploader.destroy(cookBookKey)
                    const uploadedFile = await cloudinary.uploader.upload(req.file.path)
                    removeFiles(req.file.path)
                    cookBook[COOKBOOK_FIELDS.image] = uploadedFile.secure_url
                    cookBook[COOKBOOK_FIELDS.cloudinary_id] = uploadedFile.public_id
                }
                cookBook[COOKBOOK_FIELDS.recipesIds] = JSON.parse(req.body.recipesIds)
                cookBook[COOKBOOK_FIELDS.filters] = JSON.parse(req.body.filters)
                createCookBookFlag = await updateCookBook(cookBook);
            }
            catch(e){
                console.log(e)
                createCookBookFlag = false;
            }
            res.json({
                success: !!createCookBookFlag,
                id:id
            })
        })
    return router;
}


module.exports = Routing;