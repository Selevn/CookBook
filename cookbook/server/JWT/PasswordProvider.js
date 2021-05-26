const fs = require('fs');
const path = require('path');
const {MESSAGES} = require("../../src/constants");

const pathToKey = path.join(__dirname, '..', 'Keys', 'id_rsa_priv.pem');
exports.PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');


exports.passportMiddlewareProvider = (passportInstance) => {
    const passport = passportInstance
    return (req, res, next)=>{
        passport.authenticate('jwt', {session: false},(err)=>{
            if(err){
                return res.json({
                    success: false,
                    error: MESSAGES.ERROR.AUTH,
                })
            }
            else
                return next()
        })(req, res, next)
    }
}