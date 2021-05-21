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
const recipeUpload = multer({ storage: recipeStorage });


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
    console.log(data)
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




app.post(ROUTES.CHANGE_ACC_IMAGE,
    passport.authenticate('jwt', {session: false}),
    userUpload.single('avatar'),
    async function (req, res, next) {
    const newName = req.body.id+'__'+req.file.filename;
    fs.readdir(FOLDERS.USERS_AVATARS, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            if(file.startsWith(req.body.id+'__')){
                fs.unlinkSync(FOLDERS.USERS_AVATARS+file)
            }
        });
    });
    fs.renameSync(FOLDERS.USERS_AVATARS+req.file.filename, FOLDERS.USERS_AVATARS+newName);

    await updateUser(req.body.id, 'image',`/img/profileImages/${newName}`)

    res.json({
        success: true,
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
        const newName = req.files['image'][0].filename;
        const secondaryFilesNames = []
        for (const file of req.files['gallery']) {
            secondaryFilesNames.push(file.filename)
        }
        const recipe = {...req.body}
        recipe[RECIPE_FIELDS.directions] = JSON.parse(recipe[RECIPE_FIELDS.directions])
        recipe[RECIPE_FIELDS.ingredients] = JSON.parse(recipe[RECIPE_FIELDS.ingredients])
        recipe[RECIPE_FIELDS.image] = `/img/recipeImages/${newName}`
        recipe[RECIPE_FIELDS.images] = secondaryFilesNames.map(item=>`/img/recipeImages/${item}`)
        createRecipeFlag = await createRecipe(recipe);
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
    recipeUpload.single('image'),
    async function (req, res, next) {
        let createCookBookFlag = false;
        try{
            console.log(req.body)
            const newName = req.file.filename;
            const cookBook = {...req.body}
            cookBook[COOKBOOK_FIELDS.image] = `/img/recipeImages/${newName}`
            cookBook[COOKBOOK_FIELDS.recipesIds] = JSON.parse(req.body.recipesIds)

            cookBook[COOKBOOK_FIELDS.filters] = JSON.parse(req.body.filters)
            createCookBookFlag = await createCookBook(cookBook);
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
