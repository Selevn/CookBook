import {GridCellParams} from "@material-ui/data-grid";
import {TableImage} from "../StyledComponents";
import React, {useState} from "react";
import {update} from "../../../connector/Proxy";
import {FrontEndRoutes} from "../../../constants/ServerRoutes";
import {IconButton} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const MyMenu = ({status, id, rerenderIntiator}: { status: number, id: number, rerenderIntiator: any }) => {

    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLAnchorElement) | (EventTarget & HTMLButtonElement) | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    enum Action {
        View,
        Delete,
        Block,
        Unblock,
        Restore,
    }

    const logicHandler = async (action: Action) => {
        let isOk;
        switch (action) {
            case Action.View: {
                break;
            }
            case Action.Block: {
                isOk = await update(FrontEndRoutes.USERS_CHANGE, {_id: id, status: 1});
                console.log(isOk)
                break;
            }
            case Action.Delete: {
                isOk = await update(FrontEndRoutes.USERS_CHANGE, {_id: id, status: 2});
                console.log(isOk)
                break;
            }
            case Action.Unblock: {
                isOk = await update(FrontEndRoutes.USERS_CHANGE, {_id: id, status: 0});
                console.log(isOk)
                break;
            }
            case Action.Restore: {
                isOk = await update(FrontEndRoutes.USERS_CHANGE, {_id: id, status: 0});
                console.log(isOk)
                break;
            }
        }
        if (isOk)
            rerenderIntiator((s: boolean) => !s)
        setAnchorEl(null);
    }

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
            onClose={() => {
                setAnchorEl(null)
            }}
            PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                },
            }}
        >
            <MenuItem onClick={() => {
                logicHandler(Action.View)
            }}>
                View
            </MenuItem>
            {(status === 0 || Number.isNaN(status)) &&
            <>
                <MenuItem onClick={() => {
                    logicHandler(Action.Block)
                }}>
                    Block
                </MenuItem>
                <MenuItem onClick={() => {
                    logicHandler(Action.Delete)
                }}>
                    Delete
                </MenuItem>
            </>}
            {status === 1 && <>
                <MenuItem onClick={() => {
                    logicHandler(Action.Unblock)
                }}>
                    Unblock
                </MenuItem>
                <MenuItem onClick={() => {
                    logicHandler(Action.Delete)
                }}>
                    Delete
                </MenuItem>
            </>}
            {status === 2 && <>
                <MenuItem onClick={() => {
                    logicHandler(Action.Restore)
                }}>
                    Restore
                </MenuItem>
            </>}
        </Menu>
    </div>)
}

export const cookbooksColumnsCreator = (changeRerenderFlag: React.Dispatch<React.SetStateAction<boolean>>) => {
    return [
        {
            field: 'name', headerName: 'Title', width: 300,
            renderCell: (params: GridCellParams) => {
                const firstName: string = (params.formattedValue as { first: string, last: string }).first
                const lastName: string = (params.formattedValue as { first: string, last: string }).last
                const image: string = params.row.image
                return (
                    <>
                        <TableImage src={image} type={"cookbook"}/>
                        {firstName} {lastName}
                    </>
                )
            },
        },

        {field: 'author', headerName: 'Author', width: 150},
        {field: 'views', headerName: 'Cookbooks', width: 150},
        {field: 'likes', headerName: 'Recipes', width: 150},
        {field: 'comments', headerName: 'Recipes', width: 150},
        {
            field: 'status', headerName: '', width: 150,
            renderCell: (params: GridCellParams) => {
                return (
                    <MyMenu status={Number(params.value)} id={Number(params.id)}
                            rerenderIntiator={changeRerenderFlag}/>
                )
            },
        },
    ];
}