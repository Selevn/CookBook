const express = require("express");
const bodyParser = require("body-parser");
const {validateEmail, validatePassword} = require("./validator/validator");
const {ROUTES} = require("../src/constants");
const {
    getCookBook,
    getCookBooks,
    getUser,
    getUserCookBooks,
    getUserRecipes,
    createUser,
    getRecipe,
    getRecipes
} = require("./Data/dataProvider");
const passport = require('passport')
const {addComment} = require("./Data/dataProvider");
const {getComments} = require("./Data/dataProvider");
const {likeRecipe} = require("./Data/dataProvider");
const {likeCookBook} = require("./Data/dataProvider");
const {getUserLikedRecipes} = require("./Data/dataProvider");
const {getUserLikedCookBooks} = require("./Data/dataProvider");
const {getUserForLogin} = require("./Data/dataProvider");
const {checkPassword} = require("./JWT/PasswordHasher");
const {getPassword} = require("./JWT/PasswordHasher");
const {issueJWT} = require("./JWT/PasswordHasher");
const multer = require("multer")
const fs = require("fs");
const {updateRecipe} = require("./Data/dataProvider");
const {updateCookBook} = require("./Data/dataProvider");
const {visitItem} = require("./Data/dataProvider");
const {createCookBook} = require("./Data/dataProvider");
const {COOKBOOK_FIELDS} = require("../src/constants");
const {RECIPE_FIELDS} = require("../src/constants");
const {createRecipe} = require("./Data/dataProvider");
const {UserProxy} = require("./Data/DataProxy/userProxy");
const {updateUser} = require("./Data/dataProvider");
const {FOLDERS} = require("../src/constants");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, FOLDERS.USERS_AVATARS)
    },
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


/*
app.use((req,res,next)=>{
    setTimeout(next,500)
})
*/
require('./JWT/PassportConfig.js')(passport)
app.use(passport.initialize());

app.get(ROUTES.COOKBOOKS, async (req, res) => {
    const items = await getCookBooks(req.query);
    res.json(items)
});
app.get(ROUTES.RECIPES, async (req, res) => {
    const data = await getRecipes(req.query);
    res.json(
        data
    );
});

app.get(ROUTES.COMMENTS, async (req, res) => {
    console.log("getComments", req.query)
    const data = await getComments(req.query);
    res.json(
        data
    );
});
app.get(`${ROUTES.COOKBOOKS}:id`, async (req, res) => {
    const items = await getCookBook(req.params['id'], req.query);
    res.json(
        items
    );
});
app.get(`${ROUTES.RECIPES}:id`, async (req, res) => {
    const data = await getRecipe(req.params['id'], req.query);
    res.json(
        data
    );
});
app.get(`${ROUTES.USERS}:id`, async (req, res) => {
    const data = UserProxy(await getUser(req.params['id'], req.query));
    res.json(
        data
    );
});
app.get(`${ROUTES.USER_COOKBOOKS}:userId`, async (req, res) => {
    const data = await getUserCookBooks(req.params['userId'], req.query);
    res.json(
        data
    );
});
app.get(`${ROUTES.USER_RECIPES}:userId`, async (req, res) => {
    const data = await getUserRecipes(req.params['userId'], req.query);
    res.json(
        data
    );
});

app.get(`${ROUTES.USER_LIKED_COOKBOOKS}:userId`, async (req, res) => {
    const data = await getUserLikedCookBooks(req.params['userId'], req.query);
    res.json(
        data
    );
});
app.get(`${ROUTES.USER_LIKED_RECIPES}:userId`, async (req, res) => {
    const data = await getUserLikedRecipes(req.params['userId'], req.query);
    res.json(
        data
    );
});

app.post(`${ROUTES.USER_LIKE_COOKBOOK}`, passport.authenticate('jwt', {session: false}), async (req, res) => {
    res.json(
        {success: await likeCookBook(req.body.from, req.body.to)}
    );
});
app.post(`${ROUTES.USER_LIKE_RECIPE}`, passport.authenticate('jwt', {session: false}), async (req, res) => {
    res.json(
        {success: await likeRecipe(req.body.from, req.body.to)}
    );
});
app.post(`${ROUTES.USER_VISIT_ITEM}`, async (req, res) => {
    res.json(
        {success: await visitItem(req.body.to, req.body.type)}
    );
});

app.post(`${ROUTES.USER_COMMENT}`, passport.authenticate('jwt', {session: false}), async (req, res) => {
    res.json(
        {success: await addComment({...req.body})}
    );
});

app.post(`/api/login`, async (req, res) => {
    const {email, password} = req.body;
    const user = (await getUserForLogin(email))[0]
    if (user) {
        if (checkPassword(password, user.password, user.salt)) {
            delete user.password
            delete user.salt

            const jwt = issueJWT(user)

            res.json({
                success: true,
                user: {...user},
                token: jwt.token,
                expiresIn: jwt.expiresIn
            })
        } else {
            res.json({
                success: false
            })
        }
    } else {
        res.json({
            success: false
        })
    }
});


app.post(`/api/register`, async (req, res, next) => {
    const {email, password, repeatPassword} = req.body;
    if (password === repeatPassword && validateEmail(email) && validatePassword(password)) {
        const {hash, salt} = getPassword(password)
        if ((await getUserForLogin(email))[0]) {
            res.json({
                success: false,
                message: "This email is already in use."
            })
            return
        }
        createUser({email: email, password: hash, salt: salt})
            .then((user) => {
                res.json({
                    success: true,
                })
            })
            .catch(err => next(err))
    } else {
        res.json({
            success: false,
            message: "Error in validating register fields. Check them and try again"
        })
    }
});


const renameFile = (folder, oldName, newName, oldStartsWith) => {
    try {
        fs.readdir(folder, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            files.forEach(function (file) {
                if(file.startsWith(oldStartsWith)){
                    fs.unlinkSync(folder+file)
                }
            });
        });
        fs.renameSync(folder+oldName, folder+newName);
    }
    catch (e){
        return false;
    }
    return true;
}

app.post(ROUTES.CHANGE_ACC_IMAGE,
    passport.authenticate('jwt', {session: false}),
    userUpload.single('avatar'),
    async function (req, res, next) {
    const newName = req.body.id+'__'+req.file.filename;
    if (!renameFile(FOLDERS.USERS_AVATARS, req.file.filename, newName, req.body.id+'__'))
        res.json({
            success: false,
        })
    const result = await updateUser(req.body.id, 'image',`/img/profileImages/${newName}`)

    res.json({
        success: result,
        img: `/img/profileImages/${newName}`,
    })
})

app.post(ROUTES.CHANGE_ACC,
    passport.authenticate('jwt', {session: false}),
    async function (req, res, next) {
    await updateUser(req.body.id, req.body.field,req.body.value)
    res.json({
        success: true,
        value: req.body.value,
    })
})

app.post(ROUTES.NEW_RECIPE,
    passport.authenticate('jwt', {session: false}),
    recipeUpload.fields([{ name: 'image', maxCount: 1 }, {name:'gallery', maxCount: 8}]),
    async function (req, res, next) {
    let createRecipeFlag = false;
    try{
        const recipe = {...req.body}

        const newId = (await createRecipe({}))._id;
        const oldName = req.files['image'][0].filename;
        const newName = `${newId}__${oldName}`;
        if(!renameFile(FOLDERS.RECIPES_IMAGES,oldName,newName))
        {
            res.send({
                success:false
            })
            return
        }
        const secondaryFilesNames = []
        if(req.files['gallery']){
            req.files['gallery'].forEach((file, position) => {
                const oldName = file.filename;
                const newName = `${newId}_${position}_${oldName}`;
                if(!renameFile(FOLDERS.RECIPES_IMAGES,oldName,newName,`${newId}_${position}_`))
                    throw new Error("Can't rename file")
                secondaryFilesNames.push(newName)
            })
            recipe[RECIPE_FIELDS.images] = secondaryFilesNames.map(item=>`/img/recipeImages/${item}`)
        }
        recipe[RECIPE_FIELDS.ID] = newId;
        recipe[RECIPE_FIELDS.directions] = JSON.parse(recipe[RECIPE_FIELDS.directions])
        recipe[RECIPE_FIELDS.ingredients] = JSON.parse(recipe[RECIPE_FIELDS.ingredients])
        recipe[RECIPE_FIELDS.image] = `/img/recipeImages/${newName}`
        createRecipeFlag = await updateRecipe(recipe);
    }
        catch(e){
        console.log(e)
            createRecipeFlag = false;
        }
        res.json({
            success: createRecipeFlag,
        })
})
app.post(ROUTES.EDIT_RECIPE,
    passport.authenticate('jwt', {session: false}),
    recipeUpload.fields([{ name: 'image', maxCount: 1 }, {name:'gallery', maxCount: 8}]),
    async function (req, res, next) {
    let createRecipeFlag = false;
    try{
        const recipe = {...req.body}
        const newId = req.body._id;
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
            /*for (const file of req.files['gallery']) {
                const oldName = file.filename;
                const newName = `${newId}__${oldName}`;

            }*/
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
            success: createRecipeFlag,
        })
})

app.post(ROUTES.NEW_COOKBOOK,
    passport.authenticate('jwt', {session: false}),
    cookBookUpload.single('image'),
    async function (req, res, next) {
        let createCookBookFlag;
        try{
            const cookBook = {...req.body}
            const newId = (await createCookBook({}))._id;
            const oldName = req.file.filename;
            const newName = `${newId}__${oldName}`;
            if(!renameFile(FOLDERS.COOKBOOK_IMAGES, oldName, newName))
                throw new Error("Can not rename file")
            cookBook[COOKBOOK_FIELDS.ID] = newId
            cookBook[COOKBOOK_FIELDS.image] = `/img/cookBookImages/${newName}`
            cookBook[COOKBOOK_FIELDS.recipesIds] = JSON.parse(req.body.recipesIds)
            cookBook[COOKBOOK_FIELDS.filters] = JSON.parse(req.body.filters)
            createCookBookFlag = await updateCookBook(cookBook);
        }
        catch(e){
            console.log(e)
            createCookBookFlag = false;
        }
        res.json({
            success: createCookBookFlag,
        })
    })

app.post(ROUTES.EDIT_COOKBOOK,
    passport.authenticate('jwt', {session: false}),
    cookBookUpload.single('image'),
    async function (req, res, next) {
        let createCookBookFlag = false;
        try{
            const cookBook = {...req.body}
            if(req.file){
                const newId = req.body._id;
                const oldName = req.file.filename;
                const newName = `${newId}__${oldName}`;
                if(!renameFile(FOLDERS.COOKBOOK_IMAGES, oldName, newName, `${newId}__`))
                    throw new Error("Can not rename file")
                cookBook[COOKBOOK_FIELDS.image] = `/img/cookBookImages/${newName}`
            }
            cookBook[COOKBOOK_FIELDS.recipesIds] = JSON.parse(req.body.recipesIds)
            cookBook[COOKBOOK_FIELDS.filters] = JSON.parse(req.body.filters)
            createCookBookFlag = await updateCookBook(cookBook);

            console.log(cookBook)
            //createCookBookFlag = await createCookBook(cookBook);
        }
        catch(e){
            console.log(e)
            createCookBookFlag = false;
        }
        res.json({
            success: createCookBookFlag,
        })
    })

app.listen(process.env.BACKEND_PORT, process.env.IP, () => console.log(`Listening on ${process.env.IP}:${process.env.BACKEND_PORT}`));
