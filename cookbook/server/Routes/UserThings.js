const express = require("express");
const {getUserCookBooks, getUserRecipes, getUserLikedCookBooks, getUserLikedRecipes} = require("../Data/dataProvider");
const {RELATIVE_ROUTES} = require("../../src/constants");

const router = express.Router();
router.get(`${RELATIVE_ROUTES.USER_COOKBOOKS}/:userId`, async (req, res) => {
    const data = await getUserCookBooks(req.params['userId'], req.query);
    res.json(
        data
    );
});
router.get(`${RELATIVE_ROUTES.USER_RECIPES}/:userId`, async (req, res) => {
    const data = await getUserRecipes(req.params['userId'], req.query);
    res.json(
        data
    );
});

router.get(`${RELATIVE_ROUTES.USER_LIKED_COOKBOOKS}/:userId`, async (req, res) => {
    const data = await getUserLikedCookBooks(req.params['userId'], req.query);
    res.json(
        data
    );
});
router.get(`${RELATIVE_ROUTES.USER_LIKED_RECIPES}/:userId`, async (req, res) => {
    const data = await getUserLikedRecipes(req.params['userId'], req.query);
    res.json(
        data
    );
});
module.exports = router;