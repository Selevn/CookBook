const fs = require("fs");
const renameFile = (folder, oldName, newName, oldStartsWith) => {
    try {
        fs.readdir(folder, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            files.forEach(function (file) {
                if(file.startsWith(oldStartsWith)){
                    fs.unlinkSync(folder+file)
                }
            });
        });
        fs.renameSync(folder+oldName, folder+newName);
    }
    catch (e){
        return false;
    }
    return true;
}

module.exports = renameFile