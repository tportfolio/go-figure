// valid action types for canvas reducer
const CanvasActionTypes = Object.freeze({
    TOGGLE_WRITING_ENABLED: "TOGGLE_WRITING_ENABLED"
});

// state representation for canvas
const initialState = {
    isCanvasWritingEnabled: false
};

/**
 * Update canvas settings based on incoming action.
 * @param {*} state - current state
 * @param {*} action - incoming action
 * @returns updated state
 */
export const handleSettings = (state = initialState, action) => {
    switch (action.type) {
        case CanvasActionTypes.TOGGLE_WRITING_ENABLED:
            return {
                ...state,
                isCanvasWritingEnabled: !state.isCanvasWritingEnabled
            };
        default:
            return state;
    }
}

/**
 * Toggles ability to write on canvas.
 * @returns action object
 */
export const toggleWritingEnabled = () => {
    return {
        type: CanvasActionTypes.TOGGLE_WRITING_ENABLED
    }
}

export default handleSettings;