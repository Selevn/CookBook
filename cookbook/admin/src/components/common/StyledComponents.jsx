"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableImage = exports.StatusContainer = exports.Container = void 0;
var styled_components_1 = require("styled-components");
exports.Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: ", ";\n"], ["\n  display: flex;\n  flex-direction: ", ";\n"])), function (props) { return (props.vertical ? 'column' : 'row'); });
exports.StatusContainer = styled_components_1.default(exports.Container)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  justify-content: space-between;\n"], ["\n  width: 100%;\n  justify-content: space-between;\n"])));
exports.TableImage = styled_components_1.default.img(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  height: 35px;\n  ", "\n  ", "\n  \n  object-fit:cover;\n  margin-right: ", ";\n"], ["\n  height: 35px;\n  ",
    "\n  ",
    "\n  \n  object-fit:cover;\n  margin-right: ", ";\n"])), function (p) { return p.type === "user" && styled_components_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      width: 35px;\n      border-radius: 100%;\n  "], ["\n      width: 35px;\n      border-radius: 100%;\n  "]))); }, function (p) { return p.type === "cookbook" && styled_components_1.css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      width: 70px;\n      border-radius: 10%;\n  "], ["\n      width: 70px;\n      border-radius: 10%;\n  "]))); }, function (p) { return p.type === "user" ? "25px" : "50px"; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
