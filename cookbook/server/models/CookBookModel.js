const {Schema, model} = require('mongoose')

const schema = new Schema({
    "_id": {
        "type": "Number"
    },
    "cloudinary_id": {
        "type": "String"
    },
    "views": {
        "type": "Number"
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
    "creationDate": {
        "type": "Date"
    },
    "filters": {
        "type": [
            "String"
        ]
    },
    "image": {
        "type": "String"
    },
    "commentsIds": {
        "type": [
            "Number"
        ]
    },
    "recipesIds": {
        "type": [
            "Number"
        ]
    },
    "likes": {
        "type": "Number"

    }
})
module.exports = model('CookBooks', schema)