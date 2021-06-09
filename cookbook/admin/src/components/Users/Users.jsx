"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Users_styled_1 = require("./Users.styled");
var react_router_dom_1 = require("react-router-dom");
var data_grid_1 = require("@material-ui/data-grid");
var UsersRouteConstants_1 = require("../../constants/UsersRouteConstants");
var columns = [
    {
        field: 'name', headerName: 'Name', width: 250, valueGetter: function (params) {
            return params.value.first + " " + params.value.last;
        }
    },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'Cookbooks', headerName: 'Cookbooks', width: 150, valueGetter: function (params) {
            return "future";
        } },
    { field: 'Recipes', headerName: 'Recipes', width: 150 },
    { field: 'Status', headerName: 'Status', width: 150 },
];
var rows = [
    {
        _id: 1,
        id: 1,
        name: { first: "Ivan", last: "Skorodumov" },
        email: "adsd@gmail.com",
        image: "https://www.drsabanci.com/assets/images/prp-ile-cilt-yenileme/prp-ile-...",
        password: "etherum",
        desc: "desc",
        likes: [1, 2, 3, 4, 5],
        comments: [2, 3, 4]
    },
    {
        _id: 2,
        id: 2,
        name: { first: "Denis", last: "Kurmashev" },
        email: "asdsd@gmail.com",
        image: "https://www.drsabanci.com/assets/images/prp-ile-cilt-yenileme/prp-ile-...",
        password: "bitcoin",
        desc: "desc2",
        likes: [1, 2, 3, 4, 5],
        comments: [1]
    },
    {
        _id: 3,
        id: 3,
        name: { first: "Sergei", last: "Arzamasov" },
        email: "serg@gmail.com",
        image: "https://www.drsabanci.com/assets/images/prp-ile-cilt-yenileme/prp-ile-...",
        password: "chia",
        desc: "desc3",
        likes: [6],
        comments: []
    },
];
var Users = function () {
    var url = react_router_dom_1.useRouteMatch().url;
    return (<Users_styled_1.UserContainer>
            <Users_styled_1.UserLinks>
                <Users_styled_1.LinkItem to={url + UsersRouteConstants_1.default.all} activeClassName={"active"}>All users</Users_styled_1.LinkItem>
                <Users_styled_1.LinkItem to={url + UsersRouteConstants_1.default.blocked} activeClassName={"active"}>Blocked</Users_styled_1.LinkItem>
                <Users_styled_1.LinkItem to={url + UsersRouteConstants_1.default.deleted} activeClassName={"active"}>Deleted</Users_styled_1.LinkItem>
            </Users_styled_1.UserLinks>
            <Users_styled_1.TableContainer>
                <data_grid_1.DataGrid rows={rows} columns={columns} pageSize={4}/>
            </Users_styled_1.TableContainer>
        </Users_styled_1.UserContainer>);
};
exports.default = Users;
