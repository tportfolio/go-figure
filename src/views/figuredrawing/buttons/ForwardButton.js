import React, { useState } from 'react';
import { FastForward as FastForwardIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const ForwardButton = () => {
    return (
        <IconButton className="figure-drawing-button" key="Forward" size="large">
            <FastForwardIcon />
        </IconButton>
    );
};

export default ForwardButton;