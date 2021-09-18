import React from 'react';
import { connect } from 'react-redux';
import { Paper, Button } from '@mui/material';
import {
    AccessTime as AccessTimeIcon,
    Image as ImageIcon
} from '@mui/icons-material';

import { setSessionState } from "../../store/FigureDrawingReducer";
import SettingsSlider from './settings/SettingsSlider';
import { STATE_SESSION_RUNNING } from './constants';

const DurationSlider = () => {
    return (
        <SettingsSlider minValue={15}
            maxValue={120}
            step={15}
            defaultValue={30}
            header="Duration per image (seconds)"
            displayIcon={<AccessTimeIcon />}
        />
    );
};

const MaxImagesSlider = () => {
    return (
        <SettingsSlider minValue={5}
            maxValue={100}
            step={5}
            defaultValue={20}
            header="Maximum images for session"
            displayIcon={<ImageIcon />}
        />
    );
}

const FigureDrawingSettings = props => {
    return (
        <>
            <p className="view-header">Session settings...</p>
            <Paper className="figure-drawing-settings-container" elevation={3}>
                <DurationSlider />
                <MaxImagesSlider />
                <SettingsSlider minValue={15} maxValue={120} step={15} defaultValue={30} />
                <SettingsSlider minValue={15} maxValue={120} step={15} defaultValue={30} />
            </Paper>
            <Button onClick={() => props.setSessionState(STATE_SESSION_RUNNING)}>
                <ImageIcon fontSize="small" />
                Start session
            </Button>
        </>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setSessionState: sessionState => dispatch(setSessionState(sessionState)),
    }
};

export default connect(null, mapDispatchToProps)(FigureDrawingSettings);