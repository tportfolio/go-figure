import React, { useState } from 'react';
import { FastForward as FastForwardIcon } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

const ForwardButton = () => {
    return (
        <IconButton className="figure-drawing-button" key="Forward" >
            <FastForwardIcon />
        </IconButton>
    );
};

export default ForwardButton;