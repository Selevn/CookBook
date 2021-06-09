export type UserStatistic = {
    _id:string,
    id?:string,
    name: {
        first:string,
        last:string,
    },
    email:string,
    recipesCount:number,
    cookbooksCount:number,
    status:number,
}

export type TableStatistic = UserStatistic