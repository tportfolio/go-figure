import React, { useState } from 'react';
import { Stop as StopIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const StopButton = () => {
    return (
        <IconButton className="figure-drawing-button" key="Stop" size="large">
            <StopIcon />
        </IconButton>
    );
};

export default StopButton;