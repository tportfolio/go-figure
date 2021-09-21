import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

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
    const {setSessionState, imageDuration, images} = props;
    const [imageIndex, setImageIndex] = useState(0);
    const [secsRemaining, setSecsRemaining] = useState(imageDuration);
    const [isActive, setIsActive] = useState(true);
    const increment = MAX_PROGRESS_COUNTER_VALUE / imageDuration;
    
    const keys = Object.keys(images);
    const hash = keys[imageIndex];
    const blob = images[hash];

    // set secsRemaining back to max value
    const refreshTimer = () => {
        setSecsRemaining(imageDuration);
    };

    // increment image index
    const goToNext = () => {
        setImageIndex(prevIndex => prevIndex + 1);
        refreshTimer();
    };

    // decrement image index
    const goToPrevious = () => {
        setImageIndex(prevIndex => Math.max(prevIndex - 1, 0));
        refreshTimer();
    };

    // toggle play/pause state; reset fade effect if going from active to paused
    const toggleActiveState = () => {
        setIsActive(prevActiveState => !prevActiveState);
        setSecsRemaining(prevSecsRemaining => Math.max(FADE_DURATION_SECS, prevSecsRemaining));
    };

    // force session to end early by skipping to (max image index + 1)
    const endSession = () => {
        setImageIndex(keys.length);
    };

    // decrement secsRemaining every second while session is active
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isActive) {
                setSecsRemaining(secsRemaining - 1);
            }
        }, 1000);

        return () => clearTimeout(timer);
    });

    // end session if all images exhausted
    // move Redux update to useEffect to avoid bad state change
    useEffect(() => {
        if (imageIndex === keys.length) {
            setSessionState(STATE_SESSION_COMPLETE);
        };
    }, [imageIndex, setSessionState, keys]);

    
    if (!secsRemaining) {
        goToNext();
    }

    return (
        <div className="figure-drawing-container">
            <div className="current-image-container">
                {/* note: key property is needed to force image to refresh during transition; see https://stackoverflow.com/a/62934425 */}
                <img className={classNames("current-image", {"fade-out": secsRemaining <= 5 && isActive})} src={blob} key={hash} alt=""/>
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