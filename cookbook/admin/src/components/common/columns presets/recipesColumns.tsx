import {GridCellParams} from "@material-ui/data-grid";
import {TableImage} from "../StyledComponents";
import React, {useState} from "react";
import {remove} from "../../../connector/Proxy";
import {FrontEndRoutes} from "../../../constants/ServerRoutes";
import {IconButton} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const MyMenu = ({id, rerenderIntiator}: { id: number, rerenderIntiator: any }) => {

    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLAnchorElement) | (EventTarget & HTMLButtonElement) | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    enum Action {
        View,
        Delete
    }

    const logicHandler = async (action: Action) => {
        let isOk;
        switch (action) {
            case Action.View: {
                break;
            }
            case Action.Delete: {
                if(!window.confirm("Are you sure want to delete this item? This action cannot be undone"))
                    break;
                isOk = await remove(FrontEndRoutes.RECIPES_CHANGE, {_id: id});
                console.log(isOk)
                break;
            }
        }
        if (isOk)
            rerenderIntiator((s: boolean) => !s)
        setAnchorEl(null);
    }

    return (
        <div>
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
                <MenuItem onClick={() => {
                    logicHandler(Action.Delete)
                }}>
                    Delete
                </MenuItem>


            </Menu>
        </div>)
}

export const recipesColumnsCreator = (changeRerenderFlag: React.Dispatch<React.SetStateAction<boolean>>) => {
    return [
        {
            field: 'name', headerName: 'Title', width: 300,
            renderCell: (params: GridCellParams) => {
                const image: string = params.row.image
                return (
                    <>
                        <TableImage src={image} type={"cookbook"}/>
                        {params.formattedValue}
                    </>
                )
            },
        },

        {
            field: 'author', headerName: 'Author', width: 250, renderCell: (params: GridCellParams) => {
                const author: { first: string, last: string } = params.row.author[0].name
                const firstName: string = author.first
                const lastName: string = author.last
                return (
                    <>
                        <TableImage src={params.row.author[0].image} type={"user"}/>
                        {firstName} {lastName}
                    </>
                )
            },
        },
        {field: 'views', headerName: 'Views', width: 150},
        {field: 'likes', headerName: 'Likes', width: 150},
        {field: 'comments', headerName: 'Comments', width: 150},
        {
            field: 'status', headerName: ' ', width: 150,
            renderCell: (params: GridCellParams) => {
                return (
                    <MyMenu id={Number(params.id)}
                            rerenderIntiator={changeRerenderFlag}/>
                )
            },
        },
    ];
}