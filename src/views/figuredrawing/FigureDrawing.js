import React, { useState } from 'react';
import PlayPauseButton from './buttons/PlayPauseButton';
import RestartButton from './buttons/RestartButton';
import RewindButton from './buttons/RewindButton';
import ForwardButton from './buttons/ForwardButton';
import StopButton from './buttons/StopButton';
import FigureDrawingSettings from './FigureDrawingSettings';

const ActiveDrawingSessionLayout = () => {
    return (
        <>
            <div className="current-image-container"></div>
            <div className="figure-drawing-buttons-container">
                <RestartButton />
                <RewindButton />
                <PlayPauseButton />
                <ForwardButton />
                <StopButton />
            </div>
        </>
    );
}

const FigureDrawing = () => {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const InnerComponent = isSessionActive ? ActiveDrawingSessionLayout : FigureDrawingSettings;
    return (
        <div className="figure-drawing-container">
            <InnerComponent />
        </div>
    );
}

export default FigureDrawing;