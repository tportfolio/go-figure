import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Paper, Button, Typography } from '@mui/material';
import {
    AccessTime as AccessTimeIcon,
    Image as ImageIcon
} from '@mui/icons-material';

import { setSessionState } from "../../../store/FigureDrawingReducer";
import { SessionState } from '../figureDrawingConstants';

import "./sessionresults.css";

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

const ResultData = props => {
    const {prefix, suffix, icon: Icon} = props;
    return (
        <div className="figure-drawing-display-panel-row">
            <Typography variant={"h4"}>
                <Icon fontSize={"20px"} className="vertically-centered" style={{ paddingRight: "10px" }} />
                <b>{prefix}:</b> {suffix}
            </Typography>
        </div>
    );
}

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