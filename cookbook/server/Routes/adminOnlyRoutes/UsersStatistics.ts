const express = require("express");
const {getRecipesCount} = require("../../Data/dataProvider");
const {RELATIVE_ROUTES} = require("../../src/constants");
const router = express.Router();

router.post(RELATIVE_ROUTES.RECIPE_CHECK, async (req, res) => {
    const count = await getRecipesCount();
    if(count < Number(req.body.id))
        res.status(404).json("No item");
    else
        res.status(200).json("Ok")
});

module.exports = router