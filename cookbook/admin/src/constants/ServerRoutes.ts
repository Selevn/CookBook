export const APIEntryPoint = {
    USERS_STATISTICS: "/api/usersStatistics"
}

export const APIUserStatisticsEndPoint = {
    ALL: "/all",
    BLOCKED: "/blocked",
    DELETED: "/deleted",
}

export const FrontEndRoutes = {
    USERS_STATISTICS_ALL: `${APIEntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.ALL}`,
    USERS_STATISTICS_BLOCKED: `${APIEntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.BLOCKED}`,
    USERS_STATISTICS_DELETED: `${APIEntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.DELETED}`,
};


