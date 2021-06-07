import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@material-ui/core";
import {FaBook, FaCog, FaList, FaUser} from "react-icons/all";
import {Link} from "react-router-dom"
import RouteConstants from "../../constants/RouteConstants";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Menu() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<any, MouseEvent>) => {
// @ts-ignore
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current && !open) {
            // @ts-ignore
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        ref={anchorRef}
                        aria-controls={open ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >

                        <MenuIcon/>
                    </IconButton>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({TransitionProps, placement}) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === "bottom" ? "center top" : "center bottom"
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="menu-list-grow"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem
                                                onClick={handleClose}
                                                component={Link}
                                                to={RouteConstants.users}
                                            >
                                                <FaUser/>Users
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleClose}
                                                component={Link}
                                                to={RouteConstants.cookbooks}
                                            ><FaBook/>CookBooks</MenuItem>
                                            <MenuItem
                                                onClick={handleClose}
                                                component={Link}
                                                to={RouteConstants.recipes}
                                            ><FaList/>Recipes</MenuItem>
                                            <MenuItem
                                                onClick={handleClose}
                                                component={Link}
                                                to={RouteConstants.statistic}
                                            ><FaList/>Statistics</MenuItem>
                                            <MenuItem
                                                onClick={handleClose}
                                                component={Link}
                                                to={RouteConstants.settings}
                                            ><FaCog/>Settings</MenuItem>

                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                    <Typography variant="h6" className={classes.title}>
                        Admin panel
                    </Typography>
                    <Button color="inherit">Log out</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}