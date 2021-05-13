const {USER_FIELDS} = require("../../src/constants");
module.exports.checkField = (fieldName) => {
    if(USER_FIELDS[fieldName])
        return USER_FIELDS[fieldName]
    else
        throw new Error(`unknown user fieldname ${fieldName}`)
}