import React from 'react';
import { connect } from 'react-redux';
import { Paper, Button, Typography } from '@mui/material';
import {
    AccessTime as AccessTimeIcon,
    Image as ImageIcon
} from '@mui/icons-material';
import classNames from 'classnames';

import { setSessionState, setImageDuration, setMaxImages, SortOrder, setSortOrder } from "../../../store/FigureDrawingReducer";
import SettingsSlider from './SettingsSlider';
import SettingsRadioButtonGroup from './SettingsRadioButtonGroup';
import { SessionState } from './../figureDrawingConstants';
import { channels } from '../../../channels';

import "./sessionsettings.css";

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
            window.api.send(channels.FIGURE_DRAWING_REQUEST_FILES, fileArray);
        }
    }

    return (
        <div className="figure-drawing-display-panel-row">
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

const StartSessionButton = props => {
    return (
        <Button
            variant="contained"
            component="label"
            disabled={!props.numImages}
            onClick={props.onClickHandler}
            style={{ marginTop: "20px" }}
        >
            <ImageIcon fontSize="small" style={{ paddingRight: "10px" }} />
            <Typography style={{ color: "white" }}>
                Start session
            </Typography>
        </Button>
    );
}

const FigureDrawingSettings = props => {
    return (
        <div className={classNames("view-container", "figure-drawing-display-panel-container")}>
            <p className="view-header">New Session Settings</p>
            <Paper id="figure-drawing-settings" className={"figure-drawing-display-panel-body"} elevation={3}>
                <DurationSlider
                    duration={props.imageDuration}
                    onChangeHandler={props.setImageDuration}
                />
                <MaxImagesSlider
                    maxImages={props.maxImages}
                    onChangeHandler={props.setMaxImages}
                />
                <OrderingRadioButtons
                    sortOrder={props.sortOrder}
                    onChangeHandler={props.setSortOrder}
                />
                <FileInputSelect />
            </Paper>
            <StartSessionButton
                numImages={Object.keys(props.sessionImages).length}
                onClickHandler={() => props.setSessionState(SessionState.RUNNING)}
            />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        imageDuration: state.figuredrawing.imageDuration,
        maxImages: state.figuredrawing.maxImages,
        sortOrder: state.figuredrawing.sortOrder,
        sessionImages: state.figuredrawing.sessionImages
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