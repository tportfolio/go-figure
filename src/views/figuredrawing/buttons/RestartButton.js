import React from 'react';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import BaseButton from './BaseButton';

const RestartButton = props => {
    return (
        <BaseButton
            onClickHandler={props.onClickHandler}
            icon={RefreshIcon}
            key="Refresh"
        />
    );
};

export default RestartButton;
