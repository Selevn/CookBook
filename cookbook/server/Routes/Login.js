const express = require('express');
const {RELATIVE_ROUTES} = require("../../src/constants");
const {ROUTES} = require("../../src/constants");
const {createUser} = require("../Data/dataProvider");
const {getPassword} = require("../JWT/PasswordHasher");
const {validatePassword} = require("../validator/validator");
const {validateEmail} = require("../validator/validator");
const {issueJWT} = require("../JWT/PasswordHasher");
const {checkPassword} = require("../JWT/PasswordHasher");
const {getUserForLogin} = require("../Data/dataProvider");
const router = express.Router();
router.post(RELATIVE_ROUTES.LOGIN, async (req, res) => {
    const {email, password} = req.body;
    const user = (await getUserForLogin(email))[0]
    if (user) {
        if (checkPassword(password, user.password, user.salt)) {
            delete user.password
            delete user.salt

            const jwt = issueJWT(user)

            res.json({
                success: true,
                user: {...user},
                token: jwt.token,
                expiresIn: jwt.expiresIn
            })
        } else {
            res.json({
                success: false,
                message: "No user with this credentials"
            })
        }
    } else {
        res.json({
            success: false,
            message: "No user with this credentials"
        })
    }
});


router.post(RELATIVE_ROUTES.REGISTER, async (req, res, next) => {
    const {email, password} = req.body;
    if (password && validateEmail(email) && validatePassword(password)) {
        const {hash, salt} = getPassword(password)
        if ((await getUserForLogin(email))[0]) {
            res.json({
                success: false,
                message: "This email is already in use."
            })
            return
        }
        createUser({email: email, password: hash, salt: salt})
            .then((user) => {
                res.json({
                    success: true,
                })
            })
            .catch(err => next(err))
    } else {
        res.json({
            success: false,
            message: "Error in validating register fields. Check them and try again"
        })
    }
});

module.exports = router;