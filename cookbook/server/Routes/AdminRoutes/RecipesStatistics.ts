import {APICookBookStatisticsEndPoint, APIRecipesStatisticsEndPoint} from "../../../admin/src/constants/ServerRoutes";
import {
    getRecipesStatistic,
} from "../../Data/Providers/AdminStatistics";

import {deleteRecipe} from "../../Data/Providers/DeleteProvider"

const express = require("express");
const router = express.Router();

router.get(APICookBookStatisticsEndPoint.ALL, async (req, res) => {
    const page = Number(req?.query?.page)
    const sort = req?.query?.sort

    const result = await getRecipesStatistic(page, sort);
    result.docs.map(item => {
        item.likes = item.likes || 0
    })
    res.status(200).json(result)
});

router.delete(APIRecipesStatisticsEndPoint.CHANGE, async (req, res) => {
    console.log(req.body.params)
    const result = await deleteRecipe(req.body.params._id);
    res.status(200).json(result)
});


module.exports = router