import {LinkItem, UserContainer, UserLinks, TableContainer} from "./Users.styled";
import {useLocation, useRouteMatch} from "react-router-dom"
import UsersRouteConstants from "../../constants/UsersRouteConstants";
import {FrontEndRoutes} from "../../constants/ServerRoutes";
import Table from "../common/Table";
import React, {useEffect, useState} from "react";
import { userColumnsCreator} from "../common/columns presets/userColumns";

const Users = () => {
    const {url} = useRouteMatch()
    const location = useLocation()
    const [source, setSource] = useState(FrontEndRoutes.USERS_STATISTICS_ALL)

    const [rerenderFlag, changeRerenderFlag] = useState(true)

    const columns = userColumnsCreator(changeRerenderFlag);

    useEffect(() => {
        const finalLocation: string = '/' + location.pathname.split('/')[2]
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
                <Table columns={columns} source={source} rerenderFlag={rerenderFlag} />
            </TableContainer>
        </UserContainer>)
}

export default Users