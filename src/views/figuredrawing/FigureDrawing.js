import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import FigureDrawingSettings from './FigureDrawingSettings';
import ActiveDrawingSessionLayout from './ActiveDrawingSessionLayout';
import FigureDrawingResults from "./FigureDrawingResults";
import { SessionState } from "./figureDrawingConstants";

const formatTimeString = ms => {
    let hours, minutes, seconds;
    seconds = Math.floor(ms / 1000);
    [seconds, minutes] = [seconds % 60, Math.floor(seconds / 60)];
    [minutes, hours] = [minutes % 60, Math.floor(minutes / 60)];

    const units = {hours, minutes, seconds};
    // if value is 0, use empty string (which gets filtered); otherwise, check whether to append "s" if value is not 1
    const valToString = val => units[val] ? units[val] + ` ${val.slice(0, -1)}` + (units[val] !== 1 ? "s" : "") : "";

    return Object.keys(units).map(valToString).filter(s => s).join(", ");
};

const FigureDrawing = props => {
    const {sessionState, sessionImages} = props;
    const [timeStarted, setTimeStarted] = useState(0);

    useEffect(() => {
        if (sessionState === SessionState.RUNNING) {
            setTimeStarted(Date.now());
        }
    }, [sessionState]);

    switch (sessionState) {
        case SessionState.SELECT_SETTINGS:
            return <FigureDrawingSettings />;
        case SessionState.RUNNING:
            return <ActiveDrawingSessionLayout />;
        case SessionState.COMPLETE:
            return (
                <FigureDrawingResults
                    timeElapsed={formatTimeString(Date.now() - timeStarted)}
                    numImages={Object.keys(sessionImages).length} // TODO: update for case where session stops early
                />
            );
        default:
            console.warn(`Unknown session state ${sessionState}`);
            return null;
    }
}

const mapStateToProps = state => {
    return {
        sessionState: state.figuredrawing.sessionState,
        sessionImages: state.figuredrawing.sessionImages
    }
};

export default connect(mapStateToProps)(FigureDrawing);