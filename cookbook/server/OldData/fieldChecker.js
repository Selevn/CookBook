const {USER_FIELDS} = require("../../src/constants");
module.exports.checkField = (fieldName) => {
    if(USER_FIELDS[fieldName])
        return USER_FIELDS[fieldName]
    else
        if(fieldName === USER_FIELDS.firstName || fieldName === USER_FIELDS.lastName)
            return true
    throw new Error(`unknown user fieldname ${fieldName}`)
}