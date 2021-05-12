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
const {likeRecipe} = require("./Data/dataProvider");
const {likeCookBook} = require("./Data/dataProvider");
const {getUserLikedRecipes} = require("./Data/dataProvider");
const {getUserLikedCookBooks} = require("./Data/dataProvider");
const {getUserForLogin} = require("./Data/dataProvider");
const {checkPassword} = require("./JWT/PasswordHasher");
const {getPassword} = require("./JWT/PasswordHasher");
const {issueJWT} = require("./JWT/PasswordHasher");

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
    const data = await getUser(req.params['id'], req.query);
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

app.post(`${ROUTES.USER_LIKE_COOKBOOK}`, passport.authenticate('jwt', {session: false}),async (req, res) => {
    res.json(
        {success: await likeCookBook(req.body.from, req.body.to)}
    );
});
app.post(`${ROUTES.USER_LIKE_RECIPE}`, passport.authenticate('jwt', {session: false}),async (req, res) => {
    res.json(
        {success:await likeRecipe(req.body.from, req.body.to)}
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
        if((await getUserForLogin(email))[0]){
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

app.get('/api/test', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({
        success: true,
    })
})

/*



app.get('/api/recipes/', async (req, res) => {
    const data = normalizeRecipes(await getRecipes(req.query));
    res.json(
        JSON.stringify(data)
    );
});
app.get(`/api/recipes/:id`, async (req, res) => {
    const data = normalizeRecipes(await getRecipe(req.params['id']));
    res.json(
        JSON.stringify(data)
    );
});*/


app.listen(port, () => console.log(`Listening on port ${port}`));
