import React from 'react';
import { FastForward as FastForwardIcon } from '@mui/icons-material';

import BaseButton from './BaseButton';

/**
 * Skips to next image, or ends session if on last image.
 * @param {*} props 
 * @returns ForwardButton component
 */
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