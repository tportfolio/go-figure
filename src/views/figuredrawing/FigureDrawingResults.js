import React from 'react';
import { connect } from 'react-redux';
import { Paper, Button, Typography } from '@mui/material';
import {
    AccessTime as AccessTimeIcon,
    Image as ImageIcon
} from '@mui/icons-material';

import { setSessionState } from "../../store/FigureDrawingReducer";
import { SessionState } from './figureDrawingConstants';

const SettingsReturnButton = props => {
    return (
        <div className="figure-drawing-setting">
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
        <div className="figure-drawing-result-data">
            <Typography variant={"h4"}>
                <Icon fontSize={"20px"} className="vertically-centered" style={{ paddingRight: "10px" }} />
                <b>{prefix}:</b> {suffix}
            </Typography>
        </div>
    );
}

const FigureDrawingResults = props => {
    return (
        <div className="view-container" id="figure-drawing-results-container">
            <p className="view-header">Session Results</p>
            <Paper id="figure-drawing-results" elevation={3}>
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