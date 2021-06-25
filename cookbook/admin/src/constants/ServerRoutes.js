"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontEndRoutes = exports.APIGlobalStatisticsEndPoint = exports.APIRecipesStatisticsEndPoint = exports.APICookBookStatisticsEndPoint = exports.APIUserStatisticsEndPoint = exports.EntryPoint = exports.AdminAPI = void 0;
exports.AdminAPI = "/api/admin";
exports.EntryPoint = {
    USERS_STATISTICS: "/usersStatistics",
    COOKBOOKS_STATISTICS: "/cookbooksStatistics",
    RECIPES_STATISTICS: "/recipesStatistics",
    GLOBAL_STATISTICS: "/globalStatistics",
};
exports.APIUserStatisticsEndPoint = {
    ALL: "/all",
    BLOCKED: "/blocked",
    DELETED: "/deleted",
    CHANGE: "/change",
};
exports.APICookBookStatisticsEndPoint = {
    ALL: "/all",
    CHANGE: "/change",
};
exports.APIRecipesStatisticsEndPoint = {
    ALL: "/all",
    CHANGE: "/change",
};
exports.APIGlobalStatisticsEndPoint = {
    ALL: "/"
};
exports.FrontEndRoutes = {
    USERS_STATISTICS_ALL: "" + exports.AdminAPI + exports.EntryPoint.USERS_STATISTICS + exports.APIUserStatisticsEndPoint.ALL,
    USERS_STATISTICS_BLOCKED: "" + exports.AdminAPI + exports.EntryPoint.USERS_STATISTICS + exports.APIUserStatisticsEndPoint.BLOCKED,
    USERS_STATISTICS_DELETED: "" + exports.AdminAPI + exports.EntryPoint.USERS_STATISTICS + exports.APIUserStatisticsEndPoint.DELETED,
    USERS_CHANGE: "" + exports.AdminAPI + exports.EntryPoint.USERS_STATISTICS + exports.APIUserStatisticsEndPoint.CHANGE,
    COOKBOOKS_STATISTICS_ALL: "" + exports.AdminAPI + exports.EntryPoint.COOKBOOKS_STATISTICS + exports.APICookBookStatisticsEndPoint.ALL,
    COOKBOOKS_CHANGE: "" + exports.AdminAPI + exports.EntryPoint.COOKBOOKS_STATISTICS + exports.APICookBookStatisticsEndPoint.CHANGE,
    RECIPES_STATISTICS_ALL: "" + exports.AdminAPI + exports.EntryPoint.RECIPES_STATISTICS + exports.APIRecipesStatisticsEndPoint.ALL,
    RECIPES_CHANGE: "" + exports.AdminAPI + exports.EntryPoint.RECIPES_STATISTICS + exports.APIRecipesStatisticsEndPoint.CHANGE,
    GLOBAL_STATISTICS: "" + exports.AdminAPI + exports.EntryPoint.GLOBAL_STATISTICS + exports.APIGlobalStatisticsEndPoint.ALL,
};
