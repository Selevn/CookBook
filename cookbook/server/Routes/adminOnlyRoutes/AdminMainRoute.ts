import {EntryPoint} from "../../../admin/src/constants/ServerRoutes";

const express = require("express");
const router = express.Router();

const userStatisticsRouter = require('./UsersStatistics');
router.use(EntryPoint.USERS_STATISTICS, userStatisticsRouter);

module.exports = router