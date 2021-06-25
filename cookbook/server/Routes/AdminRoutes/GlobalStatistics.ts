import {
    APIGlobalStatisticsEndPoint,
} from "../../../admin/src/constants/ServerRoutes";
import {
    getAllStatistics,
} from "../../Data/Providers/AdminStatistics";

const express = require("express");
const router = express.Router();

router.get(APIGlobalStatisticsEndPoint.ALL, async (req, res) => {
    const result = await getAllStatistics();
    res.status(200).json(result)
});

module.exports = router