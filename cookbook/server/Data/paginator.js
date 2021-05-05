exports.paginator = async (aggregate, options) => {
    const length = (await aggregate).length;
    return {
        docs: await aggregate.sort(options.sort).skip((options.page-1) * options.limit).limit(options.limit).exec(),
        nextPage: options.page+1,
        hasNextPage: length-(options.page * options.limit) > 0,
        total: length
    }

}