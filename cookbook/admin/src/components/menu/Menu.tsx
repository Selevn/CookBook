import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Book, ExitToApp, ListAlt, Person} from "@material-ui/icons";
import {NavLink, useLocation, Link} from "react-router-dom";
import SPAClientRouteConstants from "../../constants/SPAClientRouteConstants";
import {FaCog, FaEye} from "react-icons/all";

import {
    AdminCardStyled,
    AdminData,
    AdminImage,
    AdminName,
    AdminRole,
    Main,
    MenuStyled,
    SearchStyled
} from "./Menu.styled";
import UsersRouteConstants from "../../constants/UsersRouteConstants";
const { innerWidth: width } = window;

const drawerWidth = width>500?200:50;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));


type Props = {
    children: JSX.Element,
};

export default function Menu({ children }: Props) {
    const location = useLocation()

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MenuStyled drawerWidth={drawerWidth}>
                <SearchStyled placeholder={"Search"} />
                <Link to={"/settings"} style={{textDecoration:"none"}}>
                <AdminCardStyled>
                    <AdminImage src={"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"}/>
                        <AdminData>
                            <AdminName>Valar morghulius</AdminName>
                            <AdminRole>SuperAdmin</AdminRole>
                        </AdminData>
                </AdminCardStyled>
                </Link>
            </MenuStyled>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem component={NavLink}
                              isActive={() => location.pathname.startsWith(SPAClientRouteConstants.users)}
                              to={SPAClientRouteConstants.users+UsersRouteConstants.all} activeClassName="selected">
                        <ListItemIcon><Person /></ListItemIcon>
                        <ListItemText primary={"Users"} />
                    </ListItem>
                    <ListItem component={NavLink} to={SPAClientRouteConstants.cookbooks} activeClassName="selected">
                        <ListItemIcon><Book /></ListItemIcon>
                        <ListItemText primary={"CookBooks"} />
                    </ListItem>
                    <ListItem component={NavLink} to={SPAClientRouteConstants.recipes} activeClassName="selected">
                        <ListItemIcon><ListAlt /></ListItemIcon>
                        <ListItemText primary={"Recipes"} />
                    </ListItem>
                    <ListItem component={NavLink} to={SPAClientRouteConstants.statistic} activeClassName="selected">
                        <ListItemIcon><FaEye /></ListItemIcon>
                        <ListItemText primary={"Statistic"} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem component={NavLink} to={SPAClientRouteConstants.settings} activeClassName="selected">
                        <ListItemIcon><FaCog /></ListItemIcon>
                        <ListItemText primary={"Settings"} />
                    </ListItem>
                    <ListItem component={NavLink} to={SPAClientRouteConstants.logout}>
                        <ListItemIcon><ExitToApp /></ListItemIcon>
                        <ListItemText primary={"Log out"} />
                    </ListItem>
                </List>
            </Drawer>
            <Main headerHeight={84}>
                {children}
            </Main>
        </div>
    );
}
