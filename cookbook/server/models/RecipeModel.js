const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const {Schema, model} = require('mongoose')

const schema = new Schema({
    "_id": {
        "type": "Number"
    },
    "cloudinary_id":{
        "type": "String"
    },
    "secondary_cloudinary_ids":{
        "type": "Array"
    },
    "views": {
        "type": "Number"
    },
    "image": {
        "type": "String"
    },
    "images": {
        "type":
            [
                "String"
            ]
    },
    "cookTime":
        {
            "type":
                "Number"
        }
    ,
    "creationDate":
        {
            "type":
                "Date"
        }
    ,
    "author":
        {
            "type":
                "Number"
        }
    ,
    "name":
        {
            "type":
                "String"
        }
    ,
    "desc":
        {
            "type":
                "String"
        }
    ,
    "commentsIds":
        {
            "type":
                [
                    "Number"
                ]
        }
    ,
    "likes":
        {
            "type":
                "Number"
        }
    ,
    "ingredients":
        {
            "type":
                [
                    "String"
                ]
        }
    ,
    "directions":
        {
            "type":
                [
                    "String"
                ]
        }
})
schema.plugin(aggregatePaginate)
module.exports = model('Recipe', schema)