import React from 'react';
import { connect } from 'react-redux';
import { Paper, Button, Typography } from '@mui/material';
import {
    AccessTime as AccessTimeIcon,
    Image as ImageIcon
} from '@mui/icons-material';

import { setSessionState, setImageDuration, setMaxImages, SortOrder, setSortOrder } from "../../store/FigureDrawingReducer";
import SettingsSlider from './settings/SettingsSlider';
import SettingsRadioButtonGroup from './settings/SettingsRadioButtonGroup';
import { STATE_SESSION_RUNNING } from './constants';
import { FIGURE_DRAWING_FILE_SENDER_CHANNEL } from '../../constants';

const DurationSlider = props => {
    return (
        <SettingsSlider
            minValue={15}
            maxValue={120}
            step={15}
            defaultValue={props.duration}
            onChangeHandler={props.onChangeHandler}
            header="Duration per image (seconds)"
            displayIcon={<AccessTimeIcon />}
        />
    );
};

const MaxImagesSlider = props => {
    return (
        <SettingsSlider
            minValue={5}
            maxValue={100}
            step={5}
            defaultValue={props.maxImages}
            onChangeHandler={props.onChangeHandler}
            header="Maximum images for session"
            displayIcon={<ImageIcon />}
        />
    );
}

const OrderingRadioButtons = props => {
    return (
        <SettingsRadioButtonGroup
            header={"Image ordering"}
            options={SortOrder}
            selected={props.sortOrder}
            onChangeHandler={props.onChangeHandler}
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
                <Typography style={{ color: "white" }}>
                    Add files to session...
                </Typography>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
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
                <DurationSlider duration={props.imageDuration} onChangeHandler={props.setImageDuration} />
                <MaxImagesSlider maxImages={props.maxImages} onChangeHandler={props.setMaxImages} />
                <OrderingRadioButtons sortOrder={props.sortOrder} onChangeHandler={props.setSortOrder}/>
                <FileInputSelect />
            </Paper>
            <Button
                variant="contained"
                component="label"
                onClick={() => props.setSessionState(STATE_SESSION_RUNNING)}
                style={{ marginTop: "20px" }}
            >
                <ImageIcon fontSize="small" style={{ paddingRight: "10px" }} />
                <Typography style={{ color: "white" }}>
                    Start session
                </Typography>
            </Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        imageDuration: state.figuredrawing.imageDuration,
        maxImages: state.figuredrawing.maxImages,
        sortOrder: state.figuredrawing.sortOrder
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSessionState: sessionState => dispatch(setSessionState(sessionState)),
        setImageDuration: duration => dispatch(setImageDuration(duration)),
        setMaxImages: maxImages => dispatch(setMaxImages(maxImages)),
        setSortOrder: sortOrder => dispatch(setSortOrder(sortOrder))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FigureDrawingSettings);