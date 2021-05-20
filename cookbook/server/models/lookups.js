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
exports.likedRecipesLookUp =
    {
        $lookup: {
            from: "recipes",
            let: {"liked.recipes": "$recipesIds"},
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

exports.publicUserData = ({$project: {"password": 0, "email": 0}})
exports.privateUserData = ({$project: {"password": 0}})

exports._idMatcher = (id) =>
    ({
        $match: {_id: Number(id)}
    })

exports.emailMatcher = (email) =>
    ({
        $match: {email: email}
    })
exports.passwordMatcher = (password) =>
    ({
        $match: {password: password}
    })

exports.authorIdMatcher = (id) =>
    ({
        $match: {author: Number(id)}
    })
exports.idInRangeMatcher = (ids) =>
    ({
        $match: {_id: {$in : ids}}
    })
exports.nameLkeMatcher = (like) =>
    ({
        $match: {name: { $regex: like, $options: 'ig'}}
    })

exports.filtersMatcher = (filters) =>
    ({
        $match:
            {
                $expr:
                    {
                        $setEquals:
                            ["$filters", filters]
                    }
            }
    })
exports.cookTimeFilter = (filter) =>
    ({
        $match: {cookTime: Number(filter)}
    })
exports.hideMyFilter = (id) =>
    ({
        $match: {author: {$ne: Number(id)}}
    })


