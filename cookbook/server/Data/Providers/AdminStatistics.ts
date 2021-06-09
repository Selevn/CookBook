const {Users} = require("../../models/modelsExporter");

const {Aggregator} = require("../utils/Aggregator");
const {COMMON} = require("../ConstantsProvider");
const {userRecipesCount, userCookBooksCount, userStatisticsFields} = require("../../models/lookups");
const {paginator} = require("../utils/paginator");

const aggregateOptions = Aggregator(COMMON);

export const getUsersStatistics = async (page?:Number, sortBy?:string) => {
    const aggregate = Users.aggregate([
        userRecipesCount,
        userCookBooksCount,
        userStatisticsFields
    ])
    return await paginator(aggregate, aggregateOptions(page, sortBy))
}