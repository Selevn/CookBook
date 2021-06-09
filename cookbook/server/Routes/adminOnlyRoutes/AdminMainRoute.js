"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerRoutes_1 = require("../../../admin/src/constants/ServerRoutes");
var express = require("express");
var router = express.Router();
var userStatisticsRouter = require('./UsersStatistics');
router.use(ServerRoutes_1.EntryPoint.USERS_STATISTICS, userStatisticsRouter);
module.exports = router;