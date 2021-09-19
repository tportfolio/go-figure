import React, { useState } from 'react';
import { connect } from 'react-redux';
import { base64StringToBlob } from 'blob-util';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import PlayPauseButton from './buttons/PlayPauseButton';
import RestartButton from './buttons/RestartButton';
import StopButton from './buttons/StopButton';
import ForwardButton from './buttons/ForwardButton';
import RewindButton from './buttons/RewindButton';

const ActiveDrawingSessionLayout = props => {
    const [imageIndex, setImageIndex] = useState(0);
    const keys = Object.keys(props.images);
    const blob = URL.createObjectURL(base64StringToBlob(props.images[keys[imageIndex]], "image/png"));

    const goToNext = () => {
        setImageIndex(Math.min(imageIndex + 1, keys.length - 1));
    };

    const goToPrevious = () => {
        setImageIndex(Math.max(imageIndex - 1, 0));
    };

    return (
        <div className="figure-drawing-container">
            <div className="current-image-container">
                <img className="current-image" src={blob} />
            </div>
            <div className="current-image-timer-container">
                <LinearProgress className="current-image-timer" variant="determinate" value={50} />
            </div>
            <div className="figure-drawing-buttons-container">
                <RestartButton />
                <RewindButton onClickHandler={goToPrevious} />
                <PlayPauseButton />
                <ForwardButton onClickHandler={goToNext} />
                <StopButton />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        images: state.figuredrawing.sessionImages
    }
};

export default connect(mapStateToProps)(ActiveDrawingSessionLayout);