export const AdminAPI:string = "/api/admin"


export const EntryPoint = {
    USERS_STATISTICS: "/usersStatistics"
}

export const APIUserStatisticsEndPoint = {
    ALL: "/all",
    BLOCKED: "/blocked",
    DELETED: "/deleted",

    CHANGE: "/change",
}

export const FrontEndRoutes = {
    USERS_STATISTICS_ALL: `${AdminAPI}${EntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.ALL}`,
    USERS_STATISTICS_BLOCKED: `${AdminAPI}${EntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.BLOCKED}`,
    USERS_STATISTICS_DELETED: `${AdminAPI}${EntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.DELETED}`,

    USERS_CHANGE: `${AdminAPI}${EntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.CHANGE}`,
};


