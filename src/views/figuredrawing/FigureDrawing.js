import React from 'react';
import { connect } from 'react-redux';

import FigureDrawingSettings from './FigureDrawingSettings';
import ActiveDrawingSessionLayout from './ActiveDrawingSessionLayout';
import * as StateConstants from "./constants";

const stateToComponentMap = {
    [StateConstants.STATE_SELECT_SETTINGS]: <FigureDrawingSettings />,
    [StateConstants.STATE_SESSION_RUNNING]: <ActiveDrawingSessionLayout />
};

const FigureDrawing = props => {
    console.log(`Current state is: ${props.sessionState}`)
    return (
        <div className="figure-drawing-container">
            {stateToComponentMap[props.sessionState]}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        sessionState: state.figuredrawing.sessionState,
    }
};

export default connect(mapStateToProps)(FigureDrawing);