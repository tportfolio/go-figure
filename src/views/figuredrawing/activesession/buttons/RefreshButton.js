import React from 'react';
import { Refresh as RefreshIcon } from '@mui/icons-material';

import BaseButton from './BaseButton';

/**
 * Refreshes the time for current image.
 * @param {*} props 
 * @returns RefreshButton component
 */
const RefreshButton = props => {
    return (
        <BaseButton
            onClickHandler={props.onClickHandler}
            icon={RefreshIcon}
            key="Refresh"
        />
    );
};

export default RefreshButton;
