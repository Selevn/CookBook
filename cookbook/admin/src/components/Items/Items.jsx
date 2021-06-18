"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Users_styled_1 = require("../Users/Users.styled");
var Table_1 = require("../common/Table");
var cookBooksColumns_1 = require("../common/columns presets/cookBooksColumns");
var ServerRoutes_1 = require("../../constants/ServerRoutes");
var Items = function (type) {
    var filler = { heading: "", src: "" };
    if (type === "cookbook") {
        filler.heading = "CookBooks";
        filler.src = ServerRoutes_1.FrontEndRoutes.COOKBOOKS_STATISTICS_ALL;
    }
    if (type === "recipe") {
        filler.heading = "Recipes";
        filler.src = ServerRoutes_1.FrontEndRoutes.RECIPES_STATISTICS_ALL;
    }
    var _a = react_1.useState(true), rerenderFlag = _a[0], changeRerenderFlag = _a[1];
    var columns = cookBooksColumns_1.cookbooksColumnsCreator(changeRerenderFlag);
    return (<Users_styled_1.UserContainer>
            <h1>{filler.heading}</h1>
            <Users_styled_1.TableContainer>
                <Table_1.default columns={columns} source={filler.src} rerenderFlag={rerenderFlag}/>
            </Users_styled_1.TableContainer>
        </Users_styled_1.UserContainer>);
};
exports.default = Items;
