const {Schema, model} = require('mongoose')

const schema = new Schema({
    "_id": {
        "type": "Number"
    },
    "name": {
        "first": {
            "type": "String"
        },
        "last": {
            "type": "String"
        }
    },
    "image": {
        "type": "String"
    },
    "email": {
        "type": "String"
    },
    "password": {
        "type": "String"
    },
    "salt": {
        "type": "String"
    },
    "desc": {
        "type": "String"
    },
    "likes": {
        "recipes": {
            "type": [
                "Number"
            ]
        },
        "cookBooks": {
            "type": [
                "Number"
            ]
        }
    },
    "comments": {
        "type": [
            "Number"
        ]
    }
})

module.exports = model('User', schema)