import React, { useState } from 'react';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

const RestartButton = () => {
    return (
        <IconButton className="figure-drawing-button" key="Restart" >
            <RefreshIcon />
        </IconButton>
    );
};

export default RestartButton;
