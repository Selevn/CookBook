const Aggregator = (COMMON) => {
    const dataSearchSorter = (type) => {
        if (!type) {
            return () => {
                throw new Error(`Type was falsy type! Type: ${type}`);
            };
        }
        switch (type) {
            case COMMON.POPULAR:
                return "-views";
            case COMMON.NEWEST:
                return "-creationDate";
            case COMMON.LIKED:
                return "-likes";
            case COMMON.OURCHOISE:
                return "-_id";
            case COMMON.ID:
                return "-_id";
            default:
                return () => {
                    throw new Error(
                        `searchSorter function default condition. Check your input value. it was ${type}`,
                    );
                };
        }
    };

    return (page = 1, sortBy = COMMON.ID) => ({
        page: Number(page),
        limit: 15,
        sort: dataSearchSorter(sortBy)
    })
}

exports.Aggregator = Aggregator