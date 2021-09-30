import React from 'react';
import { FastForward as FastForwardIcon } from '@mui/icons-material';
import BaseButton from './BaseButton';

const ForwardButton = props => {
    return (
        <BaseButton
            onClickHandler={props.onClickHandler}
            icon={FastForwardIcon}
            key="FastForward"
        />
    );
};

export default ForwardButton;