const TOGGLE_ENABLED = "TOGGLE_ENABLED";

const initialState = {
    isEnabled: false
};

export const handleSettings = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_ENABLED:
            return {
                ...state,
                isEnabled: !state.isEnabled
            };
        default:
            return state;
    }
}

export const toggleEnabledState = () => {
    return {
        type: TOGGLE_ENABLED,
        payload: {}
    }
}

export default handleSettings;