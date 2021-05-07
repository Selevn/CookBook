const Users = require('../models/UserModel')
const {PRIV_KEY} = require("./PasswordProvider");
const {getUser} = require("../Data/dataProvider");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy



const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PRIV_KEY,
    algorithms: ['RS256'],
}
const strategy = new JwtStrategy(options, (payload, done) => {

    getUser(payload.sub)
        .then((user) => {
            if(user){
                return done(null, user)
            }
             else{
                return done(null, false)
            }
        })
        .catch(
            (error) => done(error, null))

})

module.exports = (passport) => {
    passport.use(strategy);
}
