const multer = require("multer")
const {FOLDERS} = require("../src/constants");



const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, FOLDERS.USERS_AVATARS)
    }
})
const userUpload = multer({ storage: userStorage });

const recipeStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, FOLDERS.RECIPES_IMAGES)
    },
    filename: function (req, file, cb){
        cb(null, file.originalname + '-' + Date.now() + '.jpg');
    }
})
const cookBookStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, FOLDERS.COOKBOOK_IMAGES)
    },
    filename: function (req, file, cb){
        cb(null, file.originalname + '-' + Date.now() + '.jpg');
    }
})

const recipeUpload = multer({ storage: recipeStorage });
const cookBookUpload = multer({ storage: cookBookStorage });

module.exports = {cookBookUpload, recipeUpload, userUpload}