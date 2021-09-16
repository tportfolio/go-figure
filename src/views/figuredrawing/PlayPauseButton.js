import React, { useState } from 'react';
import { Pause as PauseIcon, PlayArrow as PlayArrowIcon } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

const PlayPauseButton = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const Component = isPlaying ? PauseIcon : PlayArrowIcon;

    return (
        <IconButton className="figure-drawing-button" key="Play/Pause" onClick={() => setIsPlaying(!isPlaying)} >
            <Component />
        </IconButton>
    );
};

export default PlayPauseButton;
