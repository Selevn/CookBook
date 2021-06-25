export const AdminAPI:string = "/api/admin"


export const EntryPoint = {
    USERS_STATISTICS: "/usersStatistics",
    COOKBOOKS_STATISTICS: "/cookbooksStatistics",
    RECIPES_STATISTICS: "/recipesStatistics",
    GLOBAL_STATISTICS: "/globalStatistics",
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
export const APIRecipesStatisticsEndPoint = {
    ALL: "/all",

    CHANGE: "/change",
}

export const APIGlobalStatisticsEndPoint = {
    ALL: "/"
}





export const FrontEndRoutes = {
    USERS_STATISTICS_ALL: `${AdminAPI}${EntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.ALL}`,
    USERS_STATISTICS_BLOCKED: `${AdminAPI}${EntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.BLOCKED}`,
    USERS_STATISTICS_DELETED: `${AdminAPI}${EntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.DELETED}`,

    USERS_CHANGE: `${AdminAPI}${EntryPoint.USERS_STATISTICS}${APIUserStatisticsEndPoint.CHANGE}`,


    COOKBOOKS_STATISTICS_ALL: `${AdminAPI}${EntryPoint.COOKBOOKS_STATISTICS}${APICookBookStatisticsEndPoint.ALL}`,
    COOKBOOKS_CHANGE: `${AdminAPI}${EntryPoint.COOKBOOKS_STATISTICS}${APICookBookStatisticsEndPoint.CHANGE}`,

    RECIPES_STATISTICS_ALL: `${AdminAPI}${EntryPoint.RECIPES_STATISTICS}${APIRecipesStatisticsEndPoint.ALL}`,
    RECIPES_CHANGE: `${AdminAPI}${EntryPoint.RECIPES_STATISTICS}${APIRecipesStatisticsEndPoint.CHANGE}`,

    GLOBAL_STATISTICS: `${AdminAPI}${EntryPoint.GLOBAL_STATISTICS}${APIGlobalStatisticsEndPoint.ALL}`,


};


