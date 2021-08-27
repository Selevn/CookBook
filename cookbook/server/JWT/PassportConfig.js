const {JWT} = require("../../src/constants");
const {PRIV_KEY} = require("./PasswordProvider");
const {getUser} = require("../Data/dataProvider");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PRIV_KEY,
    algorithms: ['RS256'],
    jsonWebTokenOptions: {
        maxAge: JWT.maxAge
    }
}
const strategy = new JwtStrategy(options, async (payload, done) => {
    if (new Date() > payload.exp)
        return done(true, null)
    getUser(payload.sub)
        .then((user) => {
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch(
            (error) => done(error, null))
})

module.exports = (passport) => {
    console.log("Strategy added")
    passport.use(strategy);
}
