import React from 'react';
import { Stop as StopIcon } from '@mui/icons-material';

import BaseButton from './BaseButton';

/**
 * Ends drawing session early.
 * @param {*} props 
 * @returns StopButton component
 */
const StopButton = props => {
    return (
        <BaseButton
            onClickHandler={props.onClickHandler}
            icon={StopIcon}
            key="Stop"
        />
    );
};

export default StopButton;