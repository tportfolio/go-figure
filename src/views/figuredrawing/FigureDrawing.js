import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import FigureDrawingSettings from './settings/FigureDrawingSettings';
import ActiveDrawingSessionLayout from './activesession/ActiveDrawingSessionLayout';
import FigureDrawingResults from "./results/FigureDrawingResults";
import { SessionState } from "./figureDrawingConstants";
import { appendToSessionHistory } from '../../store/FigureDrawingReducer';
import { channels } from '../../channels';

import "./figuredrawing.css";

const formatTimeString = ms => {
    let hours, minutes, seconds;
    seconds = Math.floor(ms / 1000);
    [seconds, minutes] = [seconds % 60, Math.floor(seconds / 60)];
    [minutes, hours] = [minutes % 60, Math.floor(minutes / 60)];

    const units = { hours, minutes, seconds };
    // if value is 0, use empty string (which gets filtered); otherwise, check whether to append "s" if value is not 1
    const valToString = val => units[val] ? units[val] + ` ${val.slice(0, -1)}` + (units[val] !== 1 ? "s" : "") : "";

    return Object.keys(units).map(valToString).filter(s => s).join(", ");
};

const FigureDrawing = props => {
    const { sessionState, sessionImages, saveSessionData } = props;
    const [timeStarted, setTimeStarted] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        if (sessionState === SessionState.RUNNING) {
            setTimeStarted(Date.now());
        } else if (sessionState === SessionState.COMPLETE) {
            const currentTime = Date.now();
            const timeDiff = currentTime - timeStarted;
            const session = {
                timeEpochMsecs: currentTime,
                timeElapsedMsecs: timeDiff,
                numImages: Object.keys(sessionImages).length
            };
            
            if (saveSessionData) {
                window.api.send(channels.STATS_SAVE_TO_FILE, session);
            }

            props.appendToSessionHistory(session);
            setTimeElapsed(timeDiff);
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
                    timeElapsed={formatTimeString(timeElapsed)}
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
        sessionImages: state.figuredrawing.sessionImages,
        saveSessionData: state.settings.saveSessionData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        appendToSessionHistory: session => dispatch(appendToSessionHistory(session))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FigureDrawing);