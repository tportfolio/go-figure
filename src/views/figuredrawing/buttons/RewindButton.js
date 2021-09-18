import React, { useState } from 'react';
import { FastRewind as FastRewindIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const RewindButton = () => {
    return (
        <IconButton className="figure-drawing-button" key="Rewind" size="large">
            <FastRewindIcon />
        </IconButton>
    );
};

export default RewindButton;