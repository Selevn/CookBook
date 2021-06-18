import {EntryPoint} from "../../../admin/src/constants/ServerRoutes";

const express = require("express");
const router = express.Router();

const userStatisticsRouter = require('./UsersStatistics');
router.use(EntryPoint.USERS_STATISTICS, userStatisticsRouter);

const cookbooksStatisticsRouter = require('./CookBooksStatistics');
router.use(EntryPoint.COOKBOOKS_STATISTICS, cookbooksStatisticsRouter);

const recipesStatisticsRouter = require('./RecipesStatistics');
router.use(EntryPoint.RECIPES_STATISTICS, recipesStatisticsRouter);

module.exports = router