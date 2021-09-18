import PlayPauseButton from './buttons/PlayPauseButton';
import RestartButton from './buttons/RestartButton';
import RewindButton from './buttons/RewindButton';
import ForwardButton from './buttons/ForwardButton';
import StopButton from './buttons/StopButton';

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
};

export default ActiveDrawingSessionLayout;