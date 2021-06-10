import {LinkItem, UserContainer, UserLinks, TableContainer} from "./Users.styled";
import {useLocation, useRouteMatch} from "react-router-dom"
import UsersRouteConstants from "../../constants/UsersRouteConstants";
import {FrontEndRoutes} from "../../constants/ServerRoutes";
import Table from "../common/Table";
import {useEffect, useState} from "react";
import { GridCellParams } from "@material-ui/data-grid";
import {Button} from "@material-ui/core";
import UserStatus from "./UserStatus";

const columns = [
    {
        field: 'name', headerName: 'Name', width: 250, valueGetter: (params: any) => {
            return `${params.value.first} ${params.value.last}`
        }
    },

    {field: 'email', headerName: 'Email', width: 150},
    {field: 'cookbooksCount', headerName: 'Cookbooks', width: 150},
    {field: 'recipesCount', headerName: 'Recipes', width: 150},
    {field: 'status', headerName: 'Status', width: 150,
        renderCell: (params: GridCellParams) => (
            <UserStatus status={Number(params.value)}/>
        ),
    },


];

const Users = () => {
    const {url} = useRouteMatch()
    const location = useLocation()
    const [source, setSource] = useState(FrontEndRoutes.USERS_STATISTICS_ALL)

    useEffect(() => {
        const finalLocation: string = '/'+location.pathname.split('/')[2]
        switch (finalLocation) {
            case UsersRouteConstants.all: {
                setSource(FrontEndRoutes.USERS_STATISTICS_ALL);
                break;
            }
            case UsersRouteConstants.blocked: {
                setSource(FrontEndRoutes.USERS_STATISTICS_BLOCKED);
                break;
            }
            case UsersRouteConstants.deleted: {
                setSource(FrontEndRoutes.USERS_STATISTICS_DELETED);
                break;
            }
            default:
                break;
        }
    }, [location.pathname])
    return (
        <UserContainer>
            <UserLinks>
                <LinkItem to={url + UsersRouteConstants.all} activeClassName={"active"}>All users</LinkItem>
                <LinkItem to={url + UsersRouteConstants.blocked} activeClassName={"active"}>Blocked</LinkItem>
                <LinkItem to={url + UsersRouteConstants.deleted} activeClassName={"active"}>Deleted</LinkItem>
            </UserLinks>
            <TableContainer>
                <Table columns={columns} source={source}/>
            </TableContainer>
        </UserContainer>)
}

export default Users