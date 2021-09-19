import React from 'react';
import { Pause as PauseIcon, PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const PlayPauseButton = props => {
    const Component = props.isActive ? PauseIcon : PlayArrowIcon;

    return (
        <IconButton
            className="figure-drawing-button"
            key="Play/Pause"
            onClick={props.onClickHandler}
            size="large">
            <Component />
        </IconButton>
    );
};

export default PlayPauseButton;
