import React from 'react';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const RestartButton = props => {
    return (
        <IconButton onClick={props.onClickHandler} className="figure-drawing-button" key="Restart" size="large">
            <RefreshIcon />
        </IconButton>
    );
};

export default RestartButton;
