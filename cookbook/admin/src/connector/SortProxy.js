"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SortProxy = function (sortModel) {
    if (sortModel.length === 0)
        return "_id";
    var model = sortModel[0];
    var sortOutString;
    switch (model.field) {
        case "cookbooksCount":
            {
                sortOutString = "userCookBooks.count";
                break;
            }
        case "recipesCount":
            {
                sortOutString = "userRecipes.count";
                break;
            }
        default: sortOutString = model.field;
    }
    switch (model.sort) {
        case "desc":
            {
                sortOutString = "-" + sortOutString;
                break;
            }
        default: break;
    }
    return sortOutString;
};
exports.default = SortProxy;
