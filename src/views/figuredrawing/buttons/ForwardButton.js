import React from 'react';
import { FastForward as FastForwardIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const ForwardButton = props => {
    return (
        <IconButton onClick={props.onClickHandler} className="figure-drawing-button" key="Forward" size="large">
            <FastForwardIcon />
        </IconButton>
    );
};

export default ForwardButton;