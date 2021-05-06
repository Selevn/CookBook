
const {getCookbook, getCookBookRecipes, getCookbooks, getRecipe, getRecipes} = require('./Data/dataProvider');// "./Data/dataProvider.js";

const express = require("express");
const bodyParser = require("body-parser");
const {getUserLogin} = require("./Data/dataProvider");
const {ROUTES} = require("../src/constants");
const {getUserRecipes} = require("./Data/dataProvider");
const {getUserCookBooks} = require("./Data/dataProvider");
const {getCookBook} = require("./Data/dataProvider");
const {getComments} = require("./Data/dataProvider");
const {getComment} = require("./Data/dataProvider");
const {getCookBooks} = require("./Data/dataProvider");
const {getUser} = require("./Data/dataProvider");
const {normalizeCookbooks} = require("./Data/dataNormalizer");
const {normalizeRecipes} = require("./Data/dataNormalizer");


const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
app.use((req,res,next)=>{
    setTimeout(next,500)
})
*/

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
    const items = await getCookBook(req.params['id'],req.query);
    res.json(
        items
    );
});
app.get(`${ROUTES.RECIPES}:id`, async (req, res) => {
    const data = await getRecipe(req.params['id'],req.query);
    res.json(
        data
    );
});
app.get(`${ROUTES.USERS}:id`, async (req, res) => {
    const data = await getUser(req.params['id'],req.query);
    res.json(
        data
    );
});
app.get(`${ROUTES.USER_COOKBOOKS}:userId`, async (req, res) => {
    const data = await getUserCookBooks(req.params['userId'],req.query);
    res.json(
        data
    );
});
app.get(`${ROUTES.USER_RECIPES}:userId`, async (req, res) => {
    const data = await getUserRecipes(req.params['userId'],req.query);
    res.json(
        data
    );
});

app.post(`/api/login`, async (req, res) => {
    const {email, password} = req.body;
    console.log(email)
    console.log(password)
    console.log((await getUserLogin(email, password)))

    res.send('ok')
});




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
