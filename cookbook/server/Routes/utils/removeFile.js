const fs = require("fs");
const removeFiles = (files) => {
    if (!files) return false
    try {
        if (Array.isArray(files))
            files.forEach(file =>
                fs.unlink(file)
            )
        else
            fs.unlink(files)

    } catch (e) {
        console.log(e)
        return false;
    }
    return true;
}

module.exports = removeFiles