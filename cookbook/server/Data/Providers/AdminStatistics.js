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
exports.getAllStatistics = exports.getRecipesStatistic = exports.getCookBooksStatistics = exports.getDeletedUsersStatistics = exports.getBlockedUsersStatistics = exports.getUsersStatistics = void 0;
var _a = require("../../models/modelsExporter"), Users = _a.Users, CookBooks = _a.CookBooks, Recipes = _a.Recipes;
var Aggregator = require("../utils/Aggregator").Aggregator;
var COMMON = require("../ConstantsProvider").COMMON;
var _b = require("../../models/lookups"), userRecipesCount = _b.userRecipesCount, userCookBooksCount = _b.userCookBooksCount, userStatisticsFields = _b.userStatisticsFields, blockedUsers = _b.blockedUsers, deletedUsers = _b.deletedUsers, cookBooksStatisticFields = _b.cookBooksStatisticFields, authorLookup = _b.authorLookup;
var paginator = require("../utils/paginator").paginator;
var aggregateOptions = Aggregator(COMMON);
var getUserAggregate = function (aggregator) {
    if (aggregator === void 0) { aggregator = false; }
    var resultAggregate = [
        userRecipesCount,
        userCookBooksCount,
        userStatisticsFields
    ];
    if (aggregator)
        resultAggregate.push(aggregator);
    return Users.aggregate(resultAggregate);
};
var getCookbooksAggregate = function (aggregator) {
    if (aggregator === void 0) { aggregator = false; }
    var resultAggregate = [
        authorLookup,
        cookBooksStatisticFields
    ];
    if (aggregator)
        resultAggregate.push(aggregator);
    return CookBooks.aggregate(resultAggregate);
};
var getRecipesAggregate = function (aggregator) {
    if (aggregator === void 0) { aggregator = false; }
    var resultAggregate = [
        authorLookup,
        cookBooksStatisticFields
    ];
    if (aggregator)
        resultAggregate.push(aggregator);
    return Recipes.aggregate(resultAggregate);
};
var getUsersGlobalStatistic = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {};
                return [4 /*yield*/, Users.find({})];
            case 1:
                _a.allUsersCount = (_b.sent()).length;
                return [4 /*yield*/, Users.find({ status: 1 })];
            case 2:
                _a.blockedUsersCount = (_b.sent()).length;
                return [4 /*yield*/, Users.find({ status: 2 })];
            case 3: return [2 /*return*/, (_a.deletedUsersCount = (_b.sent()).length,
                    _a)];
        }
    });
}); };
var getBooksCount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {};
                return [4 /*yield*/, CookBooks.find({})];
            case 1: return [2 /*return*/, (_a.booksCount = (_b.sent()).length,
                    _a)];
        }
    });
}); };
var getRecipesCount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {};
                return [4 /*yield*/, Recipes.find({})];
            case 1: return [2 /*return*/, (_a.booksCount = (_b.sent()).length,
                    _a)];
        }
    });
}); };
var getBooksViews = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CookBooks.aggregate([{ $group: { _id: null, amount: { $sum: "$views" } } }])];
            case 1: return [2 /*return*/, (_a.sent())[0].amount];
        }
    });
}); };
var getRecipesViews = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Recipes.aggregate([{ $group: { _id: null, amount: { $sum: "$views" } } }])];
            case 1: return [2 /*return*/, (_a.sent())[0].amount];
        }
    });
}); };
var getMostActive = function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookBooksMaxUser, cookBooksMax, recipesMaxUser, recipesMax;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getUsersStatistics(1, "-userCookBooks.count")];
            case 1:
                cookBooksMaxUser = (_a.sent()).docs[0];
                cookBooksMax = {
                    name: cookBooksMaxUser.name.first + " " + cookBooksMaxUser.name.last,
                    image: "" + cookBooksMaxUser.image,
                    cookBooksCount: cookBooksMaxUser.userCookBooks[0].count
                };
                return [4 /*yield*/, exports.getUsersStatistics(1, "-userRecipes.count")];
            case 2:
                recipesMaxUser = (_a.sent()).docs[0];
                recipesMax = {
                    name: recipesMaxUser.name.first + " " + recipesMaxUser.name.last,
                    image: "" + cookBooksMaxUser.image,
                    recipesCount: recipesMaxUser.userRecipes[0].count
                };
                return [2 /*return*/, {
                        cookBooksMax: cookBooksMax,
                        recipesMax: recipesMax
                    }];
        }
    });
}); };
var getMostPopularBook = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, CookBooks.aggregate([authorLookup, { $sort: { 'views': -1 } }])];
        case 1: return [2 /*return*/, (_a.sent())[0]];
    }
}); }); };
var getMostPopularRecipe = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, Recipes.aggregate([authorLookup, { $sort: { 'views': -1 } }])];
        case 1: return [2 /*return*/, (_a.sent())[0]];
    }
}); }); };
var getUsersStatistics = function (page, sortBy) { return __awaiter(void 0, void 0, void 0, function () {
    var aggregate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                aggregate = getUserAggregate();
                return [4 /*yield*/, paginator(aggregate, aggregateOptions(page, sortBy))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getUsersStatistics = getUsersStatistics;
var getBlockedUsersStatistics = function (page, sortBy) { return __awaiter(void 0, void 0, void 0, function () {
    var aggregate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                aggregate = getUserAggregate(blockedUsers);
                return [4 /*yield*/, paginator(aggregate, aggregateOptions(page, sortBy))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getBlockedUsersStatistics = getBlockedUsersStatistics;
var getDeletedUsersStatistics = function (page, sortBy) { return __awaiter(void 0, void 0, void 0, function () {
    var aggregate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                aggregate = getUserAggregate(deletedUsers);
                return [4 /*yield*/, paginator(aggregate, aggregateOptions(page, sortBy))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getDeletedUsersStatistics = getDeletedUsersStatistics;
var getCookBooksStatistics = function (page, sortBy) { return __awaiter(void 0, void 0, void 0, function () {
    var aggregate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                aggregate = getCookbooksAggregate();
                return [4 /*yield*/, paginator(aggregate, aggregateOptions(page, sortBy))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getCookBooksStatistics = getCookBooksStatistics;
var getRecipesStatistic = function (page, sortBy) { return __awaiter(void 0, void 0, void 0, function () {
    var aggregate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                aggregate = getRecipesAggregate();
                return [4 /*yield*/, paginator(aggregate, aggregateOptions(page, sortBy))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getRecipesStatistic = getRecipesStatistic;
var getAllStatistics = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, mostActive, booksCount, recipesCount, booksViews, recipesViews, mostPopularBook, mostPopularRecipe;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getUsersGlobalStatistic()];
            case 1:
                users = _a.sent();
                return [4 /*yield*/, getBooksCount()];
            case 2:
                booksCount = _a.sent();
                return [4 /*yield*/, getRecipesCount()];
            case 3:
                recipesCount = _a.sent();
                return [4 /*yield*/, getBooksViews()];
            case 4:
                booksViews = _a.sent();
                return [4 /*yield*/, getRecipesViews()];
            case 5:
                recipesViews = _a.sent();
                return [4 /*yield*/, getMostActive()];
            case 6:
                mostActive = _a.sent();
                return [4 /*yield*/, getMostPopularBook()];
            case 7:
                mostPopularBook = _a.sent();
                return [4 /*yield*/, getMostPopularRecipe()];
            case 8:
                mostPopularRecipe = _a.sent();
                return [2 /*return*/, {
                        users: users, mostActive: mostActive, booksCount: booksCount, recipesCount: recipesCount, booksViews: booksViews, recipesViews: recipesViews, mostPopularBook: mostPopularBook, mostPopularRecipe: mostPopularRecipe
                    }];
        }
    });
}); };
exports.getAllStatistics = getAllStatistics;
