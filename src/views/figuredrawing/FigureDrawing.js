import React, { useState } from 'react';
import PlayPauseButton from './PlayPauseButton';
import RestartButton from './RestartButton';
import RewindButton from './RewindButton';
import ForwardButton from './ForwardButton';
import StopButton from './StopButton';

const FigureDrawing = () => {
    return (
        <div className="figure-drawing-container">
            <div className="current-image-container"></div>
            <div className="figure-drawing-buttons-container">
                <RestartButton />
                <RewindButton />
                <PlayPauseButton />
                <ForwardButton />
                <StopButton />
            </div>
        </div>
    );
}

export default FigureDrawing;