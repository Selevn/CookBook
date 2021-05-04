exports.commentsLookup = {
    $lookup: {
        from: "comments",
        let: {"commentsIds": "$commentsIds"},
        pipeline: [
            {$match: {"$expr": {"$in": ["$_id", "$$commentsIds"]}}},
            {
                $lookup: {
                    from: "users",
                    let: {user_id: "$author"},
                    pipeline: [
                        {$match: {$expr: {$eq: ["$_id", "$$user_id"]}},},
                        {$project: {_id: 1, name: 1, image: 1}}
                    ],
                    as: "author"
                }
            },
        ],
        as: "comments"
    }
}

exports.authorLookup =
    {
        $lookup: {
            from: "users",
            let: {user_id: "$author"},
            pipeline: [
                {$match: {$expr: {$eq: ["$_id", "$$user_id"]}},},
                {$project: {_id: 1, name: 1, image: 1}},
            ],
            as: "author"
        }
    }

exports.recipesLookUp =
    {
        $lookup: {
            from: "recipes",
            let: {"recipesIds": "$recipesIds"},
            pipeline: [
                {$match: {"$expr": {"$in": ["$_id", "$$recipesIds"]}}},
                {
                    $lookup: {
                        from: "users",
                        let: {user_id: "$author"},
                        pipeline: [
                            {$match: {$expr: {$eq: ["$_id", "$$user_id"]}},},
                            {$project: {_id: 1, name: 1, image: 1}}
                        ],
                        as: "author"
                    }
                },
            ],
            as: "recipes"
        }
    }
exports._idMatcher = (id) =>
    ({
        $match: {_id: Number(id)}
    })
exports.authorIdMatcher = (id) =>
    ({
        $match: {author: Number(id)}
    })
exports.filtersMatcher = (filters) =>
    ({
        $match:
            {
                $expr:
                    {
                        $setEquals:
                            [ "$filters", filters ]
                    }
            }
    })
exports.cookTimeFilter = (filter) =>
    ({
        $match:{cookTime:Number(filter)}
    })

