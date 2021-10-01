import React from 'react';
import { Pause as PauseIcon, PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import BaseButton from './BaseButton';

const PlayPauseButton = props => {
    const Component = props.isActive ? PauseIcon : PlayArrowIcon;

    return (
        <BaseButton
            onClickHandler={props.onClickHandler}
            icon={Component}
            key="Play/Pause"
        />
    );
}

export default PlayPauseButton;
