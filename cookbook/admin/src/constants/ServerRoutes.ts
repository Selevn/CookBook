export const AdminAPI:string = "/api/admin"


export const EntryPoint = {
    USERS_STATISTICS: "/usersStatistics",
    COOKBOOKS_STATISTICS: "/cookbooksStatistics",
}

export const APIUserStatisticsEndPoint = {
    ALL: "/all",
    BLOCKED: "/blocked",
    DELETED: "/deleted",

    CHANGE: "/change",
}
export const APICookBookStatisticsEndPoint = {
    ALL: "/all",

    CHANGE: "/change",
}


export const FrontEndRoutes = {
    USERS_STATISTICS_ALL: `${AdminAPI}${EntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.ALL}`,
    USERS_STATISTICS_BLOCKED: `${AdminAPI}${EntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.BLOCKED}`,
    USERS_STATISTICS_DELETED: `${AdminAPI}${EntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.DELETED}`,

    USERS_CHANGE: `${AdminAPI}${EntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.CHANGE}`,


    COOKBOOKS_STATISTICS_ALL: `${AdminAPI}${EntryPoint.COOKBOOKS_STATISTICS}${APICookBookStatisticsEndPoint.ALL}`,
    COOKBOOKS_CHANGE: `${AdminAPI}${EntryPoint.COOKBOOKS_STATISTICS}${APICookBookStatisticsEndPoint.CHANGE}`,
};


