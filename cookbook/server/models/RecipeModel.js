const {Schema, model} = require('mongoose')

const schema = new Schema({
    "_id": {
        "type": "Number"
    },
    "views": {
        "type": "Number"
    },
    "image": {
        "type": "String"
    },
    "cookTime": {
        "type": "Number"
    },
    "creationDate": {
        "type": "Date"
    },
    "author": {
        "type": "Number"
    },
    "name": {
        "type": "String"
    },
    "desc": {
        "type": "String"
    },
    "commentsIds": {
        "type": [
            "Number"
        ]
    },
    "likesIds": {
        "type": [
            "Number"
        ]
    },
    "ingredients": {
        "type": [
            "String"
        ]
    },
    "directions": {
        "type": [
            "String"
        ]
    }
})

module.exports = model('Recipe', schema)