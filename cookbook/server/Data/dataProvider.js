const fs = require("fs");
const path = require("path");
const {COMMON} = require("../../src/constants");
const {password} = require("../../passwords");
const {ObjectId, aggregate} = require('mongoose')
const mongoose = require('mongoose')

const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const CookBooks = require('./../models/CookBookModel')
const Users = require('./../models/UserModel')
const Comments = require('./../models/CommentModel')
const Recipes = require('./../models/RecipeModel')
const {cookTimeFilter} = require("../models/lookups");
const {filtersMatcher} = require("../models/lookups");
const {authorIdMatcher} = require("../models/lookups");
const {_idMatcher} = require("../models/lookups");
const {recipesLookUp, authorLookup, commentsLookup} = require("../models/lookups");

async function start() {
    try {
        await mongoose.connect('mongodb+srv://Selevn:' + password + '@cluster0.9kpqi.mongodb.net/CookBook?retryWrites=true&w=majority',
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

exports.getUser = async (id) => {
    return Users.findOne({_id: Number(id)});
}
exports.getUserCookBooks = async (id) => {
    const aggregate = await CookBooks.aggregate([
        authorIdMatcher(id),
        recipesLookUp,
        authorLookup,
        commentsLookup,
    ])
    return await CookBooks.aggregatePaginate(aggregate, {page: 1, limit: 10})

}
exports.getUserRecipes = async (id) => {
    return await Recipes.aggregate([
        authorIdMatcher(id),
        authorLookup,
        commentsLookup
    ])
    const aggregate = await Recipes.aggregate([
        authorIdMatcher(id),
        authorLookup,
        commentsLookup
    ])
    return await Recipes.aggregatePaginate(aggregate, {page: 1, limit: 10})
}


exports.getCookBooks = async (filters) => {

        const filterArr = []
        for (const filter in filters) {
            if(filters[filter] == 'true')
                filterArr.push(filter)
        }

    const aggregate = await CookBooks.aggregate([
        filtersMatcher(filterArr),
        recipesLookUp,
        authorLookup,
        commentsLookup,
    ])
    return await CookBooks.aggregatePaginate(aggregate, {page: 1, limit: 10})
}
exports.getCookBook = async (id) => {
    return CookBooks.aggregate([
        _idMatcher(id),
        recipesLookUp,
        authorLookup,
        commentsLookup
    ])
}

//continue
//filters & authors
exports.getRecipes = async (filter) => {
    if(filter.cookTime !== '1000'){
        return Recipes.aggregate([
            cookTimeFilter(filter.cookTime),
            authorLookup,
            commentsLookup,
        ])
    }
    return Recipes.aggregate([
        authorLookup,
        commentsLookup,
    ]);
}
exports.getRecipe = async (id) => {
    return Recipes.aggregate([
        _idMatcher(id),
        authorLookup,
        commentsLookup,
    ]);
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




