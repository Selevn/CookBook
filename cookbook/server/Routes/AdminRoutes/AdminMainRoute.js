"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerRoutes_1 = require("../../../admin/src/constants/ServerRoutes");
var passportMiddlewareProvider = require('../../JWT/PasswordProvider').passportMiddlewareProvider;
function Routing(passport) {
    var passwordMiddleware = passportMiddlewareProvider(passport);
    var express = require('express');
    var router = express.Router();
    var userStatisticsRouter = require('./UsersStatistics');
    router.use(ServerRoutes_1.EntryPoint.USERS_STATISTICS, passwordMiddleware, userStatisticsRouter);
    var cookbooksStatisticsRouter = require('./CookBooksStatistics');
    router.use(ServerRoutes_1.EntryPoint.COOKBOOKS_STATISTICS, passwordMiddleware, cookbooksStatisticsRouter);
    var recipesStatisticsRouter = require('./RecipesStatistics');
    router.use(ServerRoutes_1.EntryPoint.RECIPES_STATISTICS, passwordMiddleware, recipesStatisticsRouter);
    var globalStatisticRouter = require('./GlobalStatistics');
    router.use(ServerRoutes_1.EntryPoint.GLOBAL_STATISTICS, passwordMiddleware, globalStatisticRouter);
    return router;
}
module.exports = Routing;
