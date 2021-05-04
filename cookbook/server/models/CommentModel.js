const {Schema, model} = require('mongoose')

const schema = new Schema({
    "_id": {
        "type": "Number"
    },
    "author": {
        "type": "Number"
    },
    "text": {
        "type": "String"
    },
    "date": {
        "type": "Date"
    }
})

module.exports = model('Comment', schema)