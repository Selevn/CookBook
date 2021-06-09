import {LinkItem, UserContainer, UserLinks, TableContainer} from "./Users.styled";
import {useRouteMatch} from "react-router-dom"
import {DataGrid, GridSortDirection} from '@material-ui/data-grid';
import UsersRouteConstants from "../../constants/UsersRouteConstants";
import {useEffect, useState} from "react";
import {get} from "../../connector/Proxy";
import {FrontEndRoutes} from "../../constants/ServerRoutes";
import {UserStatistic} from "../../interfaces/usersInterfaces";
import SortProxy from "../../connector/SortProxy";
import Table from "../common/Table";

const columns = [
    {
        field: 'name', headerName: 'Name', width: 250, valueGetter: (params: any) => {
            return `${params.value.first} ${params.value.last}`
        }
    },

    {field: 'email', headerName: 'Email', width: 150},
    {field: 'cookbooksCount', headerName: 'Cookbooks', width: 150},
    {field: 'recipesCount', headerName: 'Recipes', width: 150},
    {field: 'status', headerName: 'Status', width: 150},

];

const Users = () => {
    const {url} = useRouteMatch()


    return (
        <UserContainer>
            <UserLinks>
                <LinkItem to={url + UsersRouteConstants.all} activeClassName={"active"}>All users</LinkItem>
                <LinkItem to={url + UsersRouteConstants.blocked} activeClassName={"active"}>Blocked</LinkItem>
                <LinkItem to={url + UsersRouteConstants.deleted} activeClassName={"active"}>Deleted</LinkItem>
            </UserLinks>
            <TableContainer>
                <Table columns={columns} source={FrontEndRoutes.USERS_STATISTICS_ALL}/>
            </TableContainer>
        </UserContainer>)
}

export default Users