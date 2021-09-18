import { STATE_SELECT_SETTINGS } from "../../src/views/figuredrawing/constants";

const SET_SESSION_STATE = "set-session-state";

const initialState = {
    sessionState: STATE_SELECT_SETTINGS
};

export const handleSettings = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION_STATE:
            return {
                ...state,
                sessionState: action.payload.value
            };
        default:
            return state;
    }
}

export const setSessionState = sessionState => {
    return {
        type: SET_SESSION_STATE,
        payload: {
            value: sessionState
        }
    }
}

export default handleSettings;