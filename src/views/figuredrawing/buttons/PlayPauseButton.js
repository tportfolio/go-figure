import React, { useState } from 'react';
import { Pause as PauseIcon, PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const PlayPauseButton = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const Component = isPlaying ? PauseIcon : PlayArrowIcon;

    return (
        <IconButton
            className="figure-drawing-button"
            key="Play/Pause"
            onClick={() => setIsPlaying(!isPlaying)}
            size="large">
            <Component />
        </IconButton>
    );
};

export default PlayPauseButton;
