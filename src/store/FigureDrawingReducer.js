import { STATE_SELECT_SETTINGS } from "../../src/views/figuredrawing/constants";
import { imageHash } from "../utils/utils";

const SET_SESSION_STATE = "set-session-state";
const ADD_SESSION_IMAGES = "add-session-images";

const initialState = {
    sessionState: STATE_SELECT_SETTINGS,
    sessionImages: {}, // base64 data only (k: hash, v: base64 data)
};

export const handleSettings = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION_STATE:
            return {
                ...state,
                sessionState: action.payload.value
            };
        case ADD_SESSION_IMAGES:
            const hash = imageHash(action.payload.value);
            return {
                ...state,
                sessionImages: {...state.sessionImages, [hash]: action.payload.value}
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

export const addSessionImage = images => {
    return {
        type: ADD_SESSION_IMAGES,
        payload: {
            value: images
        }
    }
}

export default handleSettings;