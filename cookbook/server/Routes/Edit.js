const express = require('express');
const fs = require("fs");
const renameFile = require("./utils/renameFile");
const {updateRecipe} = require("../Data/dataProvider");
const {RECIPE_FIELDS} = require("../../src/constants");
const {updateCookBook} = require("../Data/dataProvider");
const {COOKBOOK_FIELDS} = require("../../src/constants");
const {updateUser} = require("../Data/dataProvider");
const {FOLDERS} = require("../../src/constants");
const {RELATIVE_ROUTES} = require("../../src/constants");
const {passportMiddlewareProvider} = require("../JWT/PasswordProvider");
const {ROUTES} = require("../../src/constants");
const {createUser} = require("../Data/dataProvider");
const {getPassword} = require("../JWT/PasswordHasher");
const {validatePassword} = require("../validator/validator");
const {validateEmail} = require("../validator/validator");
const {issueJWT} = require("../JWT/PasswordHasher");
const {checkPassword} = require("../JWT/PasswordHasher");
const {getUserForLogin} = require("../Data/dataProvider");

function Routing(passport) {
    const passwordMiddleware = passportMiddlewareProvider(passport);
    const {cookBookUpload, recipeUpload, userUpload} = require('../multerSettings')

    const router = express.Router();

    router.post(RELATIVE_ROUTES.CHANGE_ACC_IMAGE,
        passwordMiddleware,
        userUpload.single('avatar'),
        async function (req, res, next) {
            const newName = req.body.id+'__'+req.file.filename;
            if (!renameFile(FOLDERS.USERS_AVATARS, req.file.filename, newName, req.body.id+'__'))
                res.json({
                    success: false,
                })
            const result = await updateUser(req.body.id, 'image',`/img/profileImages/${newName}`)
            res.json({
                success: !!result,
                img: `/img/profileImages/${newName}`,
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
            let createRecipeFlag = false;
            const newId = req.body._id;
            try{
                const recipe = {...req.body}
                if(req.files['image'])
                {
                    const oldName = req.files['image'][0].filename;
                    const newName = `${newId}__${oldName}`;
                    if(!renameFile(FOLDERS.RECIPES_IMAGES,oldName,newName,`${newId}__`))
                        throw new Error("File was not renamed")
                    recipe[RECIPE_FIELDS.image] = `/img/recipeImages/${newName}`
                }

                if(req.files['gallery']){
                    const secondaryFilesNames = []
                    req.files['gallery'].forEach((file, position) => {
                        const oldName = file.filename;
                        const newName = `${newId}_${position}_${oldName}`;
                        renameFile(FOLDERS.RECIPES_IMAGES,oldName,newName,`${newId}_${position}_`)
                        secondaryFilesNames.push(newName)
                    })
                    recipe[RECIPE_FIELDS.images] = secondaryFilesNames.map(item=>`/img/recipeImages/${item}`)
                }
                if(!req.files['gallery'])
                {
                    recipe[RECIPE_FIELDS.images] = JSON.parse(req.body.images)
                }
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
                id:newId
            })
        })

    router.post(RELATIVE_ROUTES.EDIT_COOKBOOK,
        passwordMiddleware,
        cookBookUpload.single('image'),
        async function (req, res, next) {
            let createCookBookFlag = false;
            const newId = req.body._id;

            try{
                const cookBook = {...req.body}
                if(req.file){
                    const oldName = req.file.filename;
                    const newName = `${newId}__${oldName}`;
                    if(!renameFile(FOLDERS.COOKBOOK_IMAGES, oldName, newName, `${newId}__`))
                        throw new Error("Can not rename file")
                    cookBook[COOKBOOK_FIELDS.image] = `/img/cookBookImages/${newName}`
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
                id:newId
            })
        })
    return router;
}


module.exports = Routing;