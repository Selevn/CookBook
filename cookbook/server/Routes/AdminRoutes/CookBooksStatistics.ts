import {APICookBookStatisticsEndPoint} from "../../../admin/src/constants/ServerRoutes";
import {
    getCookBooksStatistics,
} from "../../Data/Providers/AdminStatistics";

import {updateUser} from "../../Data/Providers/UpdateProvider"

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

router.patch(APICookBookStatisticsEndPoint.CHANGE, async (req, res) => {
    const result = await updateUser(req.body.params._id, "status", req.body.params.status);
    res.status(200).json(result)
});


module.exports = router