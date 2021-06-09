import {APIUserStatisticsEndPoint} from "../../../admin/src/constants/ServerRoutes";
import {getUsersStatistics} from "../../Data/Providers/AdminStatistics";

const express = require("express");
const {getRecipesCount} = require("../../Data/dataProvider");
const router = express.Router();

router.get(APIUserStatisticsEndPoint.ALL, async (req, res) => {
    const result = await getUsersStatistics();
    result.docs.map(item => {
        item.recipesCount = item.userRecipes?.count || 0
        item.cookbooksCount = item.userCookBooks?.count || 0
        delete  item.userCookBooks
        delete  item.userRecipes
    })
    res.status(200).json(result)
});

router.get(APIUserStatisticsEndPoint.BLOCKED, async (req, res) => {
    const count = await getRecipesCount();
    if(count < Number(req.body.id))
        res.status(404).json("No item");
    else
        res.status(200).json("Ok")
});
router.get(APIUserStatisticsEndPoint.DELETED, async (req, res) => {
    const count = await getRecipesCount();
    if(count < Number(req.body.id))
        res.status(404).json("No item");
    else
        res.status(200).json("Ok")
});


module.exports = router