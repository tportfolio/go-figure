import React, { useState } from 'react';
import { Stop as StopIcon } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

const StopButton = () => {
    return (
        <IconButton className="figure-drawing-button" key="Stop" >
            <StopIcon />
        </IconButton>
    );
};

export default StopButton;