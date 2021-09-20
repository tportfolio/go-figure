import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { base64StringToBlob } from 'blob-util';
import { Typography, LinearProgress } from '@mui/material';
import classNames from 'classnames';

import PlayPauseButton from './buttons/PlayPauseButton';
import RestartButton from './buttons/RestartButton';
import StopButton from './buttons/StopButton';
import ForwardButton from './buttons/ForwardButton';
import RewindButton from './buttons/RewindButton';
import { setSessionState } from "../../store/FigureDrawingReducer";
import { STATE_SESSION_COMPLETE } from './constants';

const MAX_PROGRESS_COUNTER_VALUE = 100;
const FADE_DURATION_SECS = 5;

const ActiveDrawingSessionLayout = props => {
    const [imageIndex, setImageIndex] = useState(0);
    const [secsRemaining, setSecsRemaining] = useState(props.imageDuration);
    const [isActive, setIsActive] = useState(true);
    const increment = MAX_PROGRESS_COUNTER_VALUE / props.imageDuration;

    const keys = Object.keys(props.images);
    const blob = URL.createObjectURL(base64StringToBlob(props.images[keys[imageIndex]], "image/png"));

    const goToNext = () => {
        const nextIndex = imageIndex + 1;

        if (nextIndex === keys.length) {
            props.setSessionState(STATE_SESSION_COMPLETE);
        } else {
            setImageIndex(nextIndex);
            setSecsRemaining(props.imageDuration);
        }
    };

    const goToPrevious = () => {
        setImageIndex(Math.max(imageIndex - 1, 0));
        setSecsRemaining(props.imageDuration);
    };

    const toggleActiveState = () => {
        if (!isActive && secsRemaining <= FADE_DURATION_SECS) {
            setSecsRemaining(FADE_DURATION_SECS);
        }
        setIsActive(!isActive);
    }

    const refreshTimer = () => {
        setSecsRemaining(props.imageDuration);
    }

    const endSession = () => {
        props.setSessionState(STATE_SESSION_COMPLETE);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isActive) {
                setSecsRemaining(secsRemaining - 1);
            }
        }, 1000);

        return () => clearTimeout(timer);
    });

    if (!secsRemaining) {
        goToNext();
    }

    return (
        <div className="figure-drawing-container">
            <div className="current-image-container">
                <img className={classNames("current-image", {"fade-out": secsRemaining <= FADE_DURATION_SECS && isActive})} src={blob} />
            </div>
            <div className="current-image-timer-container">
                <Typography className="current-image-time-remaining">
                    {secsRemaining}
                </Typography>
                <LinearProgress className="current-image-timer" variant="determinate" value={secsRemaining * increment} />
            </div>
            <div className="figure-drawing-buttons-container">
                <RestartButton onClickHandler={refreshTimer}/>
                <RewindButton onClickHandler={goToPrevious} />
                <PlayPauseButton onClickHandler={toggleActiveState} isActive={isActive} />
                <ForwardButton onClickHandler={goToNext} />
                <StopButton onClickHandler={endSession} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        images: state.figuredrawing.sessionImages,
        imageDuration: state.figuredrawing.imageDuration
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSessionState: sessionState => dispatch(setSessionState(sessionState))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveDrawingSessionLayout);