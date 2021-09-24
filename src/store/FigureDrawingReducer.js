import { base64StringToBlob } from 'blob-util';

import { SessionState } from "../views/figuredrawing/figureDrawingConstants";
import { imageHash } from "../utils/utils";

const SET_SESSION_STATE = "set-session-state";
const ADD_SESSION_IMAGE = "add-session-image";
const SET_IMAGE_DURATION = "set-image-duration";
const SET_MAX_IMAGES = "set-max-images";
const SET_SORT_ORDER = "set-sort-order";

export const SortOrder = Object.freeze({
    RANDOM: {name: "Random"},
    ALPHABETICAL: {name: "Alphabetical"},
    FILE_SIZE: {name: "File size"}
});

const initialState = {
    sessionState: SessionState.SELECT_SETTINGS,
    sessionImages: {},
    imageDuration: 30,
    maxImages: 20,
    sortOrder: SortOrder.RANDOM
};

export const handleSettings = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION_STATE:
            const imagesProp = action.payload.value === SessionState.SELECT_SETTINGS ? {sessionImages: {}} : {};
            return {
                ...state,
                ...imagesProp,
                sessionState: action.payload.value,
            };
        case ADD_SESSION_IMAGE:
            const hash = imageHash(action.payload.value.data);
            const blob = URL.createObjectURL(base64StringToBlob(action.payload.value.data, "image/png"));
            const {filename, filesize} = action.payload.value;
            return {
                ...state,
                sessionImages: { ...state.sessionImages, [hash]: {hash, blob, filename, filesize} }
            };
        case SET_IMAGE_DURATION:
            return {
                ...state,
                imageDuration: action.payload.value
            };
        case SET_MAX_IMAGES:
            return {
                ...state,
                maxImages: action.payload.value
            };
        case SET_SORT_ORDER:
            return {
                ...state,
                sortOrder: action.payload.value
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

export const addSessionImage = image => {
    return {
        type: ADD_SESSION_IMAGE,
        payload: {
            value: image
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

export const setMaxImages = maxImages => {
    return {
        type: SET_MAX_IMAGES,
        payload: {
            value: maxImages
        }
    }
}

export const setSortOrder = sortOrder => {
    return {
        type: SET_SORT_ORDER,
        payload: {
            value: sortOrder
        }
    }
}

export default handleSettings;