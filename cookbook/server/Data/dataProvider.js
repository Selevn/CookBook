const fs = require("fs");
const path = require("path");
const {COMMON} = require("../../src/constants");
const {ObjectId, aggregate} = require('mongoose')
const mongoose = require('mongoose')

const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const CookBooks = require('./../models/CookBookModel')
const Users = require('./../models/UserModel')
const Comments = require('./../models/CommentModel')
const Recipes = require('./../models/RecipeModel')
const {privateUserData} = require("../models/lookups");
const {publicUserData} = require("../models/lookups");
const {passwordMatcher} = require("../models/lookups");
const {emailMatcher} = require("../models/lookups");
const {paginator} = require("./paginator");
const {dataSearchSorter} = require("./dataSorter");
const {cookTimeFilter} = require("../models/lookups");
const {filtersMatcher} = require("../models/lookups");
const {authorIdMatcher} = require("../models/lookups");
const {_idMatcher} = require("../models/lookups");
const {recipesLookUp, authorLookup, commentsLookup} = require("../models/lookups");

const dotenv = require('dotenv');
const {idInRangeMatcher} = require("../models/lookups");
dotenv.config({path: '../.env'});

async function start() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            })

    } catch (e) {
        console.log(e)
    }
}

start().then(r => console.log('Connected to bd'))

const aggregateOptions = (page = 1, sortBy = COMMON.ID) => ({
    page: Number(page),
    limit: 15,
    sort: dataSearchSorter(sortBy)
})

exports.getUser = async (id) => {
    return await Users.aggregate([_idMatcher(id), publicUserData]);
}
exports.getUserCookBooks = async (id, filters) => {
    const aggregate = CookBooks.aggregate([
        authorIdMatcher(id),
        authorLookup,
        commentsLookup,
    ])
    return await paginator(aggregate, aggregateOptions(filters.page, filters.sortBy))
}

exports.getUserLikedCookBooks = async (id, filters) => {
    const user = (await exports.getUser(id))[0]
    //TODO: убери потом
    user.likes.cookBooks = user.likes.cookBooks || []

    const aggregate = CookBooks.aggregate([
        idInRangeMatcher(user.likes.cookBooks),
        authorLookup,
        commentsLookup,
    ])
    return await paginator(aggregate, aggregateOptions(filters.page, filters.sortBy))
}

exports.getUserRecipes = async (id, filters) => {
    const aggregate = Recipes.aggregate([
        authorIdMatcher(id),
        authorLookup,
        commentsLookup
    ])
    return await paginator(aggregate, aggregateOptions(filters.page, filters.sortBy))
}
exports.getUserLikedRecipes = async (id, filters) => {
    const user = (await exports.getUser(id))[0]
    //TODO: убери потом
    user.likes.recipes = user.likes.recipes || []
    const aggregate = Recipes.aggregate([
        idInRangeMatcher(user.likes.recipes),
        authorLookup,
        commentsLookup
    ])
    return await paginator(aggregate, aggregateOptions(filters.page, filters.sortBy))
}

exports.likeCookBook = async (userId, id) => {
    try {
        const user = (await exports.getUser(userId))[0]
        user.likes.cookBooks = user.likes.cookBooks || []
        if (user.likes.cookBooks.includes(Number(id))) {
            //remove
            await CookBooks.updateOne({_id: Number(id)}, {$inc: {'likes': -1}})
            await Users.updateOne(
                {_id: Number(userId)},
                {$pull: {"likes.cookBooks": Number(id)}}
            )
        } else {
            //add
            await CookBooks.updateOne({_id: Number(id)}, {$inc: {'likes': 1}})
            await Users.updateOne(
                {_id: Number(userId)},
                {$push: {"likes.cookBooks": Number(id)}}
            )
        }
        return true;
    } catch (e) {
        return false;
    }
}
exports.likeRecipe = async (userId, id) => {
    try {
        const user = (await exports.getUser(userId))[0]
        user.likes.recipes = user.likes.recipes || []
        if (user.likes.recipes.includes(Number(id))) {
            //remove
            await Recipes.updateOne({_id: Number(id)}, {$inc: {'likes': -1}})
            await Users.updateOne(
                {_id: Number(userId)},
                {$pull: {"likes.recipes": Number(id)}}
            )
        } else {
            //add
            await Recipes.updateOne({_id: Number(id)}, {$inc: {'likes': 1}})
            await Users.updateOne(
                {_id: Number(userId)},
                {$push: {"likes.recipes": Number(id)}}
            )
        }
        return true;
    } catch (e) {
        return false;
    }
}

exports.getCookBooks = async (filters) => {
    console.log(filters)
    let aggregate;
    const filterArr = []
    for (const filter in filters) {
        if (filters[filter] == 'true')
            filterArr.push(filter)
    }
    if (filterArr.length === 0)
        aggregate = CookBooks.aggregate([
            recipesLookUp,
            authorLookup,
            commentsLookup,
        ])
    else
        aggregate = CookBooks.aggregate([
            filtersMatcher(filterArr),
            recipesLookUp,
            authorLookup,
            commentsLookup,
        ])
    return await paginator(aggregate, aggregateOptions(filters.page, filters.sortBy))
}
exports.getCookBook = async (id) => {
    return CookBooks.aggregate([
        _idMatcher(id),
        authorLookup
    ])
}

//continue
//filters & authors
exports.getRecipes = async (filter) => {
    let aggregate;
    if (filter.cookTime !== '1000') {
        aggregate = Recipes.aggregate([
            cookTimeFilter(filter.cookTime),
            authorLookup,
            commentsLookup,
        ])
    } else {
        aggregate = Recipes.aggregate([
            authorLookup,
            commentsLookup,
        ]);
    }
    if (filter.cookbookId) {
        const cookbook = (await exports.getCookBook(filter.cookbookId))[0]
        aggregate = Recipes.aggregate([
            idInRangeMatcher(cookbook.recipesIds),
            authorLookup,
            commentsLookup,
        ]);
    }
    return await paginator(aggregate, aggregateOptions(filter.page, filter.sortBy))//await Recipes.aggregatePaginate(aggregate, aggregateOptions(filter.page, filter.sortBy))
}
exports.getComments = async (filter) => {
    let item, aggregate;
    if (filter.type === COMMON.COOKBOOK) {
        item = await exports.getCookBook(filter.itemId);
        aggregate = Comments.aggregate([
            idInRangeMatcher(item[0].commentsIds),
            authorLookup,
        ])
    } else {
        item = await exports.getRecipe(filter.itemId);
        aggregate = Comments.aggregate([
            idInRangeMatcher(item[0].commentsIds),
            authorLookup,
        ]);
    }
    return await paginator(aggregate, aggregateOptions(filter.page))//await Recipes.aggregatePaginate(aggregate, aggregateOptions(filter.page, filter.sortBy))


}

exports.getRecipe = async (id) => {
    return Recipes.aggregate([
        _idMatcher(id),
        authorLookup,
        commentsLookup,
    ]);
}

exports.getUserForLogin = async (email) => {
    return Users.aggregate([
        emailMatcher(email),
    ]);
}


exports.createUser = async (user) => {
    const newUser = {
        ...user,
        name: {first: 'Valar', last: 'Morghulis'},
        desc: "",
        image: 'http://tastyethnics.com/wp-content/uploads/bb-plugin/cache/default-profile-square.png',
        _id: (await Users.countDocuments({})) + 1
    }
    return (new Users(newUser)).save();
}


/*
//Deprecated
exports.getComment = async (id) => {
    const data = await Comments.aggregate([
        {$match: {_id: id}},
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "user"
            }
        }])
    return data[0];
}
exports.getComments = async (ids) => {
    const data = await Comments.aggregate([
        {$match: {_id: {"$in": ids}}},
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "user"
            }
        }])
    return data;

    //return await Comments.find({ "_id": { "$in": ids }});
}
*/




