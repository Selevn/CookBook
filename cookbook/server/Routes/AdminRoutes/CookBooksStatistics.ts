import {APICookBookStatisticsEndPoint} from "../../../admin/src/constants/ServerRoutes";
import {
    getCookBooksStatistics,
} from "../../Data/Providers/AdminStatistics";

import {deleteCookBook} from "../../Data/Providers/DeleteProvider"

const express = require("express");
const router = express.Router();

router.get(APICookBookStatisticsEndPoint.ALL, async (req, res) => {

    const page = Number(req?.query?.page)
    const sort = req?.query?.sort

    const result = await getCookBooksStatistics(page, sort);
    result.docs.map(item => {
        item.likes = item.likes || 0
    })
    res.status(200).json(result)
});

router.delete(APICookBookStatisticsEndPoint.CHANGE, async (req, res) => {
    const result = await deleteCookBook(req.body.params._id);
    res.status(200).json(result)
});

module.exports = router