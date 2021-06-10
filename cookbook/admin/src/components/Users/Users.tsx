import {LinkItem, UserContainer, UserLinks, TableContainer} from "./Users.styled";
import {useLocation, useRouteMatch} from "react-router-dom"
import UsersRouteConstants from "../../constants/UsersRouteConstants";
import {FrontEndRoutes} from "../../constants/ServerRoutes";
import Table from "../common/Table";
import {useEffect, useState} from "react";
import {GridCellParams} from "@material-ui/data-grid";
import {IconButton} from "@material-ui/core";
import UserStatus from "./UserStatus";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {StatusContainer} from "../common/StyledComponents";


const MyMenu = ({status, id}:{status:number, id:number}) => {

    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    // @ts-ignore
    const handleClick = (event) => {
        console.log(id)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (<div>
        <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreVertIcon/>
        </IconButton>
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                },
            }}
        >
            <MenuItem onClick={handleClose}>
                View
            </MenuItem>
            {status === 0 || Number.isNaN(status) && <>
                <MenuItem onClick={handleClose}>
                    Block
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    Delete
                </MenuItem>
            </>}
            {status === 1 && <>
                <MenuItem onClick={handleClose}>
                    Unblock
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    Delete
                </MenuItem>
            </>}
            {status === 2 && <>
                <MenuItem onClick={handleClose}>
                    Restore
                </MenuItem>
            </>}
        </Menu>
    </div>)
}

const columns = [
    {
        field: 'name', headerName: 'Name', width: 250, valueGetter: (params: any) => {
            return `${params.value.first} ${params.value.last}`
        }
    },

    {field: 'email', headerName: 'Email', width: 150},
    {field: 'cookbooksCount', headerName: 'Cookbooks', width: 150},
    {field: 'recipesCount', headerName: 'Recipes', width: 150},
    {
        field: 'status', headerName: 'Status', width: 150,
        renderCell: (params: GridCellParams) => {
            return (
            <StatusContainer>

                <UserStatus status={Number(params.value)}/>
                <MyMenu status={Number(params.value)} id={Number(params.id)}/>
            </StatusContainer>
        )},
    },


];

const Users = () => {
    const {url} = useRouteMatch()
    const location = useLocation()
    const [source, setSource] = useState(FrontEndRoutes.USERS_STATISTICS_ALL)

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
                <Table columns={columns} source={source}/>
            </TableContainer>
        </UserContainer>)
}

export default Users