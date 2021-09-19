import React from 'react';
import { FastRewind as FastRewindIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const RewindButton = props => {
    return (
        <IconButton onClick={props.onClickHandler} className="figure-drawing-button" key="Rewind" size="large">
            <FastRewindIcon />
        </IconButton>
    );
};

export default RewindButton;