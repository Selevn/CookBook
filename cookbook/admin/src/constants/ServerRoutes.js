"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontEndRoutes = exports.APIUserStatisticsEndPoint = exports.EntryPoint = exports.AdminAPI = void 0;
exports.AdminAPI = "/api/admin";
exports.EntryPoint = {
    USERS_STATISTICS: "/usersStatistics"
};
exports.APIUserStatisticsEndPoint = {
    ALL: "/all",
    BLOCKED: "/blocked",
    DELETED: "/deleted",
    CHANGE: "/change",
};
exports.FrontEndRoutes = {
    USERS_STATISTICS_ALL: "" + exports.AdminAPI + exports.EntryPoint.USERS_STATISTICS + exports.APIUserStatisticsEndPoint.ALL,
    USERS_STATISTICS_BLOCKED: "" + exports.AdminAPI + exports.EntryPoint.USERS_STATISTICS + exports.APIUserStatisticsEndPoint.BLOCKED,
    USERS_STATISTICS_DELETED: "" + exports.AdminAPI + exports.EntryPoint.USERS_STATISTICS + exports.APIUserStatisticsEndPoint.DELETED,
    USERS_CHANGE: "" + exports.AdminAPI + exports.EntryPoint.USERS_STATISTICS + exports.APIUserStatisticsEndPoint.CHANGE,
};
