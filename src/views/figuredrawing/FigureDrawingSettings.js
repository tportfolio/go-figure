import React from 'react';
import { connect } from 'react-redux';
import { Paper, Button } from '@mui/material';
import {
    AccessTime as AccessTimeIcon,
    Image as ImageIcon
} from '@mui/icons-material';

import { setSessionState, addSessionImages } from "../../store/FigureDrawingReducer";
import SettingsSlider from './settings/SettingsSlider';
import SettingsRadioButtonGroup from './settings/SettingsRadioButtonGroup';
import { STATE_SESSION_RUNNING } from './constants';
import { FIGURE_DRAWING_FILE_SENDER_CHANNEL, FIGURE_DRAWING_FILE_RECEIVER_CHANNEL } from '../../constants';

const DurationSlider = () => {
    return (
        <SettingsSlider
            minValue={15}
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
        <SettingsSlider
            minValue={5}
            maxValue={100}
            step={5}
            defaultValue={20}
            header="Maximum images for session"
            displayIcon={<ImageIcon />}
        />
    );
}

const OrderingRadioButtons = () => {
    return (
        <SettingsRadioButtonGroup
            header={"Image ordering"}
            options={["Random", "Alphabetical", "File size"]}
        />
    );
}

const FileInputSelect = () => {
    const onChangeHandler = event => {
        const { files } = event.target; // this is a FileList; convert to array for ease
        if (files.length > 0) {
            const fileArray = Array.from(files).map(f => f.path);
            console.log(fileArray);
            window.api.send(FIGURE_DRAWING_FILE_SENDER_CHANNEL, fileArray);
        }
    }

    return (
        <div className="figure-drawing-setting">
            <Button
                variant="contained"
                component="label"
            >
                Add files to session...
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={onChangeHandler}
                />
            </Button>
        </div>
    )
}

const FigureDrawingSettings = props => {
    return (
        <div className="figure-drawing-settings-container">
            <p className="view-header">New Session Settings</p>
            <Paper className="figure-drawing-settings" elevation={3}>
                <DurationSlider />
                <MaxImagesSlider />
                <OrderingRadioButtons />
                <FileInputSelect />
            </Paper>
            <Button onClick={() => props.setSessionState(STATE_SESSION_RUNNING)}>
                <ImageIcon fontSize="small" />
                Start session
            </Button>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setSessionState: sessionState => dispatch(setSessionState(sessionState))
    }
};

export default connect(null, mapDispatchToProps)(FigureDrawingSettings);