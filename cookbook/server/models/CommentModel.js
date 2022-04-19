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
    },
    "itemId": {
        "type": "Number"
    },
    "itemType": {
        "type": "String"
    },
})
module.exports = model('Comment', schema)