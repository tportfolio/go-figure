import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import { green, yellow, lightBlue, grey } from '@material-ui/core/colors';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
    Equalizer as EqualizerIcon,
    Info as InfoIcon, PictureInPicture as PictureInPictureIcon,
    PlayCircleFilledOutlined as PlayCircleFilledOutlinedIcon,
    Settings as SettingsIcon
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// baseline template from MUI:
// https://material-ui.com/components/drawers/#MiniDrawer.js
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        background: theme.palette.primary.dark
    },
    divider: {
        background: theme.palette.secondary.light,
    },
    list: {
        ...theme.typography,
        background: theme.palette.primary.dark,
        color: theme.palette.secondary.light
    },
    drawer: {
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        background: theme.palette.primary.dark,
        width: drawerWidth,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        background: theme.palette.primary.dark,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    }
}));

const topIcons = theme => {
    return (
        [
            {
                icon: <PlayCircleFilledOutlinedIcon style={{ color: green["A700"] }} />,
                text: "Start session",
                link: "/figuredrawing"
            },
            {
                icon: <PictureInPictureIcon style={{ color: yellow[700] }} />,
                text: "Open reference canvas",
                link: "/canvas"
            },
            {
                icon: <EqualizerIcon style={{ color: lightBlue[700] }} />,
                text: "View personal statistics",
                link: "/statsoverview"
            }
        ]
    )
};

const bottomIcons = theme => {
    return (
        [
            {
                icon: <SettingsIcon style={{ color: grey[500] }} />,
                text: "Settings",
                link: "/settings"
            },
            {
                icon: <InfoIcon style={{ color: lightBlue[50] }} />,
                text: "About app",
                link: "/about"
            }
        ]
    )
};

const MiniSidebar = props => {
    const { theme } = props;
    const classes = useStyles();
    const [isExpanded, setExpanded] = React.useState(false);

    const sideList = () => (
        <>
            <List>
                {topIcons(theme).map(i => (
                    <Link to={i.link} key={i.text} style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>{i.icon}</ListItemIcon>
                            <ListItemText primary={i.text} className={classes.list} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider classes={{ root: classes.divider }} />
            <List>
                {bottomIcons(theme).map(i => (
                    <Link to={i.link} key={i.text} style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>{i.icon}</ListItemIcon>
                            <ListItemText primary={i.text} className={classes.list} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </>
    );

    const expandDrawer = React.useCallback(() => {
        setExpanded(true);
    }, []);

    const retractDrawer = React.useCallback(() => {
        setExpanded(false);
    }, []);


    return (
        <div className={classes.root}>
            <Drawer
                onMouseEnter={expandDrawer}
                onMouseLeave={retractDrawer}
                variant="permanent"
                className={classNames(classes.drawer, {
                    [classes.drawerOpen]: isExpanded,
                    [classes.drawerClose]: !isExpanded,
                })}
                classes={{
                    paper: classNames({
                        [classes.drawerOpen]: isExpanded,
                        [classes.drawerClose]: !isExpanded,
                    }),
                }}
            >
                {sideList()}
            </Drawer>
        </div>
    );
}

const Sidebar = withTheme(MiniSidebar);

export default Sidebar;