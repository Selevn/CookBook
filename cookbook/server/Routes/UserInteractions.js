const express = require("express");
const {passportMiddlewareProvider} = require("../JWT/PasswordProvider");
const {visitItem, likeCookBook, addComment, likeRecipe} = require("../Data/dataProvider");
const {RELATIVE_ROUTES} = require("../../src/constants");

function Routing(passport) {
    const router = express.Router();
    const passwordMiddleware = passportMiddlewareProvider(passport);
    router.post(`${RELATIVE_ROUTES.USER_LIKE_COOKBOOK}`, passwordMiddleware, async (req, res) => {
        res.json(
            {success: await likeCookBook(req.body.from, req.body.to)}
        );
    });
    router.post(`${RELATIVE_ROUTES.USER_LIKE_RECIPE}`, passwordMiddleware, async (req, res) => {
        res.json(
            {success: await likeRecipe(req.body.from, req.body.to)}
        );
    });
    router.post(`${RELATIVE_ROUTES.USER_VISIT_ITEM}`, async (req, res) => {
        res.json(
            {success: await visitItem(req.body.to, req.body.type)}
        );
    });

    router.post(`${RELATIVE_ROUTES.USER_COMMENT}`, passwordMiddleware, async (req, res) => {
        res.json(
            {success: await addComment({...req.body})}
        );
    });
    return router
}
module.exports = Routing