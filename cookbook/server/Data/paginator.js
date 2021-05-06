exports.paginator = async (aggregate, options) => {
    const length = (await aggregate).length;
    if(options.sort)
        aggregate = aggregate.sort(options.sort)
    return {
        docs: await aggregate.skip((options.page-1) * options.limit).limit(options.limit).exec(),
        nextPage: length-((options.page-1) * options.limit) > 0?options.page+1:options.page,
        hasNextPage: length-(options.page * options.limit) > 0,
        total: length
    }

}