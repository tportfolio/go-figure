import React from 'react';
import { FastRewind as FastRewindIcon } from '@mui/icons-material';

import BaseButton from './BaseButton';

/**
 * Goes back an image, if possible.
 * @param {*} props 
 * @returns RewindButton
 */
const RewindButton = props => {
    return (
        <BaseButton
            onClickHandler={props.onClickHandler}
            icon={FastRewindIcon}
            key="Rewind"
        />
    );
};

export default RewindButton;