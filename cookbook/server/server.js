
const {getCookbook, getCookBookRecipes, getCookbooks, getRecipe, getRecipes} = require('./Data/dataProvider');// "./Data/dataProvider.js";

const express = require("express");
const bodyParser = require("body-parser");
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

app.use((req,res,next)=>{
    setTimeout(next,5000)
})

app.get(`/api/cookbooks/`, async (req, res) => {
    const items = await getCookBooks(req.query);
    res.json(JSON.stringify(items))
});
app.get('/api/recipes/', async (req, res) => {
    const data = await getRecipes(req.query);
    res.json(
        JSON.stringify(data)
    );
});
app.get(`/api/cookbooks/:id`, async (req, res) => {
    const items = await getCookBook(req.params['id']);
    res.json(
        JSON.stringify(items)
    );
});
app.get(`/api/recipes/:id`, async (req, res) => {
    const data = await getRecipe(req.params['id']);
    res.json(
        JSON.stringify(data)
    );
});
app.get(`/api/users/:id`, async (req, res) => {
    const data = await getUser(req.params['id']);
    res.json(
        JSON.stringify(data)
    );
});
app.get(`/api/users/cookbooks/:userId`, async (req, res) => {
    const data = await getUserCookBooks(req.params['userId']);
    res.json(
        JSON.stringify(data)
    );
});
app.get(`/api/users/recipes/:userId`, async (req, res) => {
    const data = await getUserRecipes(req.params['userId']);
    res.json(
        JSON.stringify(data)
    );
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
