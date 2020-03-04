import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import PictureInPictureIcon from '@material-ui/icons/PictureInPicture';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import InfoIcon from '@material-ui/icons/Info';
import SettingsIcon from '@material-ui/icons/Settings';
import { green, yellow, lightBlue, grey } from '@material-ui/core/colors';
import { withTheme } from '@material-ui/core/styles';

import { GlobalHotKeys } from "react-hotkeys";


const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.primary.main,
    },
    divider: {
        background: theme.palette.secondary.light,
    },
    list: {
        ...theme.typography,
        width: 300,
        background: theme.palette.primary.main,
        color: theme.palette.secondary.light
    }
}));

const topIcons = theme => {
    return (
        [
            {
                icon: <PlayCircleFilledOutlinedIcon style={{color: green["A700"]}}/>,
                text: "Start session"
            },    
            {     
                icon: <PictureInPictureIcon style={{color: yellow[700]}}/>,
                text: "Open reference canvas"
            },
            {
                icon: <EqualizerIcon style={{color: lightBlue[700]}}/>,
                text: "View personal statistics"
            }
        ]
    )
};

const bottomIcons = theme => {
    return (
        [
            {
                icon: <SettingsIcon style={{color: grey[500]}}/>,
                text: "Settings"
            },
            {
                icon: <InfoIcon style={{color: lightBlue[50]}}/>,
                text: "About app"
            }
        ]
    )
};

const Sidebar = props => {
    const {theme} = props;
    const classes = useStyles();
    const [state, setState] = React.useState(false);

    console.log("entered sidebar functional component");
    const sideList = () => (
        <div
        className={classes.list}
        role="presentation"
        >
        <List>
            {topIcons(theme).map(i => (
            <ListItem button key={i.text} onClick={() => console.log(`${i.text} was clicked`)}>
                <ListItemIcon>{i.icon}</ListItemIcon>
                <ListItemText primary={i.text} />
            </ListItem>
            ))}
        </List>
        <Divider classes={{root: classes.divider}}/>
        <List>
            {bottomIcons(theme).map(i => (
            <ListItem button key={i.text} onClick={() => console.log(`${i.text} was clicked`)}>
                <ListItemIcon>{i.icon}</ListItemIcon>
                <ListItemText primary={i.text} />
            </ListItem>
            ))}
        </List>
        </div>
    );

    const toggleOn = React.useCallback(() => {
        console.log("to right");
        setState(true);
    }, []);

    const toggleOff = React.useCallback(() => {
        console.log("to left");
        setState(false);
    }, []);


    const handlers = {
        TOGGLE_SIDEBAR_ON: toggleOn,
        TOGGLE_SIDEBAR_OFF: toggleOff
    };

    return (
        <GlobalHotKeys handlers={handlers}>
            <Drawer open={state} classes={{paper: classes.root}}>
                {sideList()}
            </Drawer>
        </GlobalHotKeys>
    );
}

export default withTheme(Sidebar);