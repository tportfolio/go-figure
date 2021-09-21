import React from 'react';
import { Stop as StopIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const StopButton = props => {
    return (
        <IconButton onClick={props.onClickHandler} className="figure-drawing-button" key="Stop" size="large">
            <StopIcon />
        </IconButton>
    );
};

export default StopButton;