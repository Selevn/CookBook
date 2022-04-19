module.exports.checkFieldWrapper = (USER_FIELDS) => {
    return (fieldName) => {
        if (USER_FIELDS[fieldName])
            return USER_FIELDS[fieldName]
        else if (fieldName === USER_FIELDS.firstName || fieldName === USER_FIELDS.lastName)
            return true
        return false //throw new Error(`unknown user fieldname ${fieldName}`)
    }
}