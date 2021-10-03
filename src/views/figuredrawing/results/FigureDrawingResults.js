import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Paper, Button, Typography } from '@mui/material';
import {
    AccessTime as AccessTimeIcon,
    Image as ImageIcon
} from '@mui/icons-material';

import { setSessionState } from '../../../store/FigureDrawingReducer';
import { SessionState } from '../figureDrawingConstants';

import './sessionresults.css';

/**
 * Brings user back to settings menu for figure drawing.
 * @param {*} props 
 * @returns SettingsReturnButton component
 */
const SettingsReturnButton = props => {
    return (
        <div className="figure-drawing-display-panel-row">
            <Button
                variant="contained"
                component="label"
                onClick={props.onClickHandler}
            >
                <Typography style={{ color: "white" }}>
                    Return to settings
                </Typography>
            </Button>
        </div>
    )
}

/**
 * List of data points to display.
 */
const dataEntries = [
    {
        prefix: "Time elapsed",
        suffixKey: "timeElapsed",
        icon: AccessTimeIcon
    },
    {
        prefix: "Pictures viewed",
        suffixKey: "numImages",
        icon: ImageIcon
    }
];

/**
 * Representation of each row of data in results.
 * @param {*} props 
 * @returns ResultData component
 */
const ResultData = props => {
    const {prefix, suffix, icon: Icon} = props;
    return (
        <div className="figure-drawing-display-panel-row">
            <Typography variant={"h4"}>
                <Icon className="vertically-centered" fontSize={"20px"} style={{ paddingRight: "10px" }} />
                <b>{prefix}:</b> {suffix}
            </Typography>
        </div>
    );
}

/**
 * Shows all results from figure drawing session.
 * @param {*} props 
 * @returns FigureDrawingResults component
 */
const FigureDrawingResults = props => {
    return (
        <div className={classNames("view-container", "figure-drawing-display-panel-container")} >
            <p className="view-header">Session Results</p>
            <Paper id="figure-drawing-results" className={"figure-drawing-display-panel-body"} elevation={3}>
                {dataEntries.map(entry => <ResultData {...entry} key={entry.suffixKey} suffix={props[entry.suffixKey]} />)}
                <SettingsReturnButton onClickHandler={() => props.setSessionState(SessionState.SELECT_SETTINGS)} />
            </Paper>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setSessionState: sessionState => dispatch(setSessionState(sessionState))
    }
};

export default connect(null, mapDispatchToProps)(FigureDrawingResults);