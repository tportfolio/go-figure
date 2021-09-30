import React from 'react';
import { FastRewind as FastRewindIcon } from '@mui/icons-material';
import BaseButton from './BaseButton';

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