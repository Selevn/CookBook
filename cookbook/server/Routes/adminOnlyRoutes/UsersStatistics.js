"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServerRoutes_1 = require("../../../admin/src/constants/ServerRoutes");
var AdminStatistics_1 = require("../../Data/Providers/AdminStatistics");
var express = require("express");
var getRecipesCount = require("../../Data/dataProvider").getRecipesCount;
var router = express.Router();
router.get(ServerRoutes_1.APIUserStatisticsEndPoint.ALL, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, sort, result;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                page = Number((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page);
                sort = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.sort;
                return [4 /*yield*/, AdminStatistics_1.getUsersStatistics(page, sort)];
            case 1:
                result = _c.sent();
                result.docs.map(function (item) {
                    var _a, _b, _c, _d;
                    item.recipesCount = ((_b = (_a = item.userRecipes) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.count) || 0;
                    item.cookbooksCount = ((_d = (_c = item.userCookBooks) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.count) || 0;
                    delete item.userCookBooks;
                    delete item.userRecipes;
                });
                res.status(200).json(result);
                return [2 /*return*/];
        }
    });
}); });
router.get(ServerRoutes_1.APIUserStatisticsEndPoint.BLOCKED, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var count;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecipesCount()];
            case 1:
                count = _a.sent();
                if (count < Number(req.body.id))
                    res.status(404).json("No item");
                else
                    res.status(200).json("Ok");
                return [2 /*return*/];
        }
    });
}); });
router.get(ServerRoutes_1.APIUserStatisticsEndPoint.DELETED, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var count;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getRecipesCount()];
            case 1:
                count = _a.sent();
                if (count < Number(req.body.id))
                    res.status(404).json("No item");
                else
                    res.status(200).json("Ok");
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
