"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipes = exports.CookBooks = void 0;
var Items_1 = require("./Items");
var CookBooks = function () { return Items_1.default("cookbook"); };
exports.CookBooks = CookBooks;
var Recipes = function () { return Items_1.default("recipe"); };
exports.Recipes = Recipes;
