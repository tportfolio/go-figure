import React, { useState } from 'react';
import { FastRewind as FastRewindIcon } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

const RewindButton = () => {
    return (
        <IconButton className="figure-drawing-button" key="Rewind" >
            <FastRewindIcon />
        </IconButton>
    );
};

export default RewindButton;