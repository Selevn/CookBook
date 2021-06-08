import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Book, ExitToApp, ListAlt, Person} from "@material-ui/icons";
import {NavLink} from "react-router-dom";
import RouteConstants from "../../constants/RouteConstants";
import {FaCog, FaEye} from "react-icons/all";
import { useLocation } from "react-router-dom";
import {AdminCardStyled, AdminData, AdminImage, AdminName, AdminRole, MenuStyled, SearchStyled} from "./Menu.styled";

const drawerWidth = 200;

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
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MenuStyled drawerWidth={drawerWidth}>
                <SearchStyled placeholder={"Search"} />
                <AdminCardStyled>
                    <AdminImage src={"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"}/>
                    <AdminData>
                        <AdminName>Valar morghulius</AdminName>
                        <AdminRole>SuperAdmin</AdminRole>
                    </AdminData>
                </AdminCardStyled>
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
                    <ListItem component={NavLink} to={RouteConstants.users} activeClassName="selected">
                        <ListItemIcon><Person /></ListItemIcon>
                        <ListItemText primary={"Users"} />
                    </ListItem>
                    <ListItem component={NavLink} to={RouteConstants.cookbooks} activeClassName="selected">
                        <ListItemIcon><Book /></ListItemIcon>
                        <ListItemText primary={"CookBooks"} />
                    </ListItem>
                    <ListItem component={NavLink} to={RouteConstants.recipes} activeClassName="selected">
                        <ListItemIcon><ListAlt /></ListItemIcon>
                        <ListItemText primary={"Recipes"} />
                    </ListItem>
                    <ListItem component={NavLink} to={RouteConstants.statistic} activeClassName="selected">
                        <ListItemIcon><FaEye /></ListItemIcon>
                        <ListItemText primary={"Statistic"} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem component={NavLink} to={RouteConstants.settings} activeClassName="selected">
                        <ListItemIcon><FaCog /></ListItemIcon>
                        <ListItemText primary={"Settings"} />
                    </ListItem>
                    <ListItem component={NavLink} to={RouteConstants.logout}>
                        <ListItemIcon><ExitToApp /></ListItemIcon>
                        <ListItemText primary={"Log out"} />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
}
