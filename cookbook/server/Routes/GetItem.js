const express = require("express");
const {RELATIVE_ROUTES} = require("../../src/constants");
const {getCookBooks, getRecipes, getComments, getCookBook, getRecipe, getUser} = require("../Data/dataProvider");
const router =express.Router()

router.get(RELATIVE_ROUTES.COOKBOOKS, async (req, res) => {
    const items = await getCookBooks(req.query);
    res.json(items)
});
router.get(RELATIVE_ROUTES.RECIPES, async (req, res) => {
    const data = await getRecipes(req.query);
    res.json(data);
});

router.get(RELATIVE_ROUTES.COMMENTS, async (req, res) => {
    const data = await getComments(req.query);
    res.json(
        data
    );
});
router.get(`${RELATIVE_ROUTES.COOKBOOKS}/:id`, async (req, res) => {
    const items = await getCookBook(req.params['id'], req.query);
    res.json(
        items
    );
});

router.get(`${RELATIVE_ROUTES.RECIPES}/:id`, async (req, res) => {
    const data = await getRecipe(req.params['id'], req.query);
    res.json(
        data
    );
});
router.get(`${RELATIVE_ROUTES.USERS}/:id`, async (req, res) => {
    const data = await getUser(req.params['id'], req.query);
    res.json(
        data
    );
});

module.exports = router