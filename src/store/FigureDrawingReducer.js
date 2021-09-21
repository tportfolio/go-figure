import { base64StringToBlob } from 'blob-util';

import { STATE_SELECT_SETTINGS } from "../../src/views/figuredrawing/constants";
import { imageHash } from "../utils/utils";

const SET_SESSION_STATE = "set-session-state";
const ADD_SESSION_IMAGES = "add-session-images";
const SET_IMAGE_DURATION = "set-image-duration";

const initialState = {
    sessionState: STATE_SELECT_SETTINGS,
    sessionImages: {}, // base64 data only (k: hash, v: base64 data)
    imageDuration: 30
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
            const blob = URL.createObjectURL(base64StringToBlob(action.payload.value, "image/png"));
            return {
                ...state,
                sessionImages: {...state.sessionImages, [hash]: blob}
            };
        case SET_IMAGE_DURATION:
            return {
                ...state,
                imageDuration: action.payload.value
            }
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

export const setImageDuration = duration => {
    return {
        type: SET_IMAGE_DURATION,
        payload: {
            value: duration
        }
    }
}

export default handleSettings;