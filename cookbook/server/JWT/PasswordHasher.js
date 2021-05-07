const jsonwebtoken = require("jsonwebtoken");
const crypto = require('crypto')
const {PRIV_KEY} = require("./PasswordProvider");

function genHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
}

exports.getPassword = (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    return {
        salt: salt,
        hash: genHash(password, salt)
    }
}
exports.checkPassword = (password, hash, salt) => {
    return hash === genHash(password, salt)
}
exports.issueJWT = (user) => {
    const id = user._id;
    const expiresIn = '1d';
    const payload = {
        sub: id,
        iat: Date.now()
    }
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn: expiresIn, algorithm: 'RS256'})
    return {
        token: "Bearer " + signedToken,
        expiresIn: expiresIn
    }
}

