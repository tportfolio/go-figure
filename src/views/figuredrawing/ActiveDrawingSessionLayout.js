import React, { useState } from 'react';
import { connect } from 'react-redux';
import { base64StringToBlob } from 'blob-util';
import IconButton from '@mui/material/IconButton';
import { 
    FastRewind as FastRewindIcon,
    FastForward as FastForwardIcon 
 } from '@mui/icons-material';

import PlayPauseButton from './buttons/PlayPauseButton';
import RestartButton from './buttons/RestartButton';
import StopButton from './buttons/StopButton';

const ForwardButton = props => {
    return (
        <IconButton onClick={props.onClickHandler} className="figure-drawing-button" key="Forward" size="large">
            <FastForwardIcon />
        </IconButton>
    );
};

const RewindButton = props => {
    return (
        <IconButton onClick={props.onClickHandler} className="figure-drawing-button" key="Rewind" size="large">
            <FastRewindIcon />
        </IconButton>
    );
};

const ActiveDrawingSessionLayout = props => {
    const [imageIndex, setImageIndex] = useState(0);
    const keys = Object.keys(props.images);    
    const blob = URL.createObjectURL(base64StringToBlob(props.images[keys[imageIndex]], "image/png"));

    const goToNext = () => {
        setImageIndex(Math.min(imageIndex+1, keys.length-1));
    };

    const goToPrevious = () => {
        setImageIndex(Math.max(imageIndex-1, 0));
    };

    return (
        <div className="figure-drawing-container">
            <div className="current-image-container">
                <img style={{maxHeight: "100%", maxWidth: "100%"}} src={blob} />
            </div>
            <div className="figure-drawing-buttons-container">
                <RestartButton />
                <RewindButton onClickHandler={goToPrevious} />
                <PlayPauseButton />
                <ForwardButton onClickHandler={goToNext}/>
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