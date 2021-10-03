import React from 'react';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';

/**
 * Baseline button for active drawing session.
 * @param {*} props 
 * @returns BaseButton component
 */
const BaseButton = props => {
    const useStyles = makeStyles(theme => ({
        root: {
            background: theme.palette.primary.dark
        }
    }));

    const classes = useStyles();
    const {onClickHandler, icon: Icon} = props;

    return (
        <IconButton
            onClick={onClickHandler}
            className="figure-drawing-button"
            classes={{root: classes.root}}
            size="large"

        >
            <Icon />
        </IconButton>
    );
};

export default BaseButton;