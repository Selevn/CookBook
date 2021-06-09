import {APIUserStatisticsEndPoint} from "../../../admin/src/constants/ServerRoutes";
import {
    getBlockedUsersStatistics,
    getDeletedUsersStatistics,
    getUsersStatistics
} from "../../Data/Providers/AdminStatistics";

const express = require("express");
const router = express.Router();

router.get(APIUserStatisticsEndPoint.ALL, async (req, res) => {
    const page = Number(req?.query?.page)
    const sort = req?.query?.sort

    const result = await getUsersStatistics(page, sort);
    result.docs.map(item => {
        item.recipesCount = item.userRecipes?.[0]?.count || 0
        item.cookbooksCount = item.userCookBooks?.[0]?.count || 0
        delete  item.userCookBooks
        delete  item.userRecipes
    })
    res.status(200).json(result)
});

router.get(APIUserStatisticsEndPoint.BLOCKED, async (req, res) => {
    const page = Number(req?.query?.page)
    const sort = req?.query?.sort

    const result = await getBlockedUsersStatistics(page, sort);
    result.docs.map(item => {
        item.recipesCount = item.userRecipes?.[0]?.count || 0
        item.cookbooksCount = item.userCookBooks?.[0]?.count || 0
        delete  item.userCookBooks
        delete  item.userRecipes
    })
    res.status(200).json(result)
});
router.get(APIUserStatisticsEndPoint.DELETED, async (req, res) => {
    const page = Number(req?.query?.page)
    const sort = req?.query?.sort

    const result = await getDeletedUsersStatistics(page, sort);
    result.docs.map(item => {
        item.recipesCount = item.userRecipes?.[0]?.count || 0
        item.cookbooksCount = item.userCookBooks?.[0]?.count || 0
        delete  item.userCookBooks
        delete  item.userRecipes
    })
    res.status(200).json(result)
});


module.exports = router