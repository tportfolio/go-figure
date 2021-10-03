import { createImageObject } from './reducerUtils';
import { SessionState } from '../views/figuredrawing/figureDrawingConstants';

// valid action types for figue drawing reducer
const FigureDrawingActionTypes = Object.freeze({
    SET_SESSION_STATE: "SET_SESSION_STATE",
    ADD_SESSION_IMAGE: "ADD_SESSION_IMAGE",
    SET_IMAGE_DURATION: "SET_IMAGE_DURATION",
    SET_MAX_IMAGES: "SET_MAX_IMAGES",
    SET_SORT_ORDER: "SET_SORT_ORDER",
    INIT_SESSION_HISTORY: "INIT_SESSION_HISTORY",
    APPEND_TO_SESSION_HISTORY: "APPEND_TO_SESSION_HISTORY"
});

// sort orders for selected images for figure drawing
export const SortOrder = Object.freeze({
    RANDOM: { name: "Random" },
    ALPHABETICAL: { name: "Alphabetical" },
    FILE_SIZE: { name: "File size" }
});

// state representation for figure drawing
const initialState = {
    sessionState: SessionState.SELECT_SETTINGS,
    sessionImages: {},
    imageDuration: 30,
    maxImages: 20,
    sortOrder: SortOrder.RANDOM,
    sessionHistory: {}
};

/**
 * Update figure drawing route based on incoming action.
 * @param {*} state - current state
 * @param {*} action - incoming action
 * @returns updated state
 */
export const handleSettings = (state = initialState, action) => {
    switch (action.type) {
        case FigureDrawingActionTypes.SET_SESSION_STATE:
            // reset selected images if we're in the settings menu
            const imagesProp = action.payload.value === SessionState.SELECT_SETTINGS ? { sessionImages: {} } : {};
            return {
                ...state,
                ...imagesProp,
                sessionState: action.payload.value,
            };
        case FigureDrawingActionTypes.ADD_SESSION_IMAGE:
            return {
                ...state,
                sessionImages: { ...state.sessionImages, ...createImageObject(action.payload.value) }
            };
        case FigureDrawingActionTypes.SET_IMAGE_DURATION:
            return {
                ...state,
                imageDuration: action.payload.value
            };
        case FigureDrawingActionTypes.SET_MAX_IMAGES:
            return {
                ...state,
                maxImages: action.payload.value
            };
        case FigureDrawingActionTypes.SET_SORT_ORDER:
            return {
                ...state,
                sortOrder: action.payload.value
            };
        case FigureDrawingActionTypes.INIT_SESSION_HISTORY:
            return {
                ...state,
                sessionHistory: action.payload.value
            };
        case FigureDrawingActionTypes.APPEND_TO_SESSION_HISTORY:
            const newHistory = { ...state.sessionHistory };
            newHistory.sessions.push(action.payload.value);
            return {
                ...state,
                sessionHistory: newHistory
            };
        default:
            return state;
    }
}

/**
 * Update session state.
 * @param {*} sessionState - session state
 * @returns action object
 */
export const setSessionState = sessionState => {
    return {
        type: FigureDrawingActionTypes.SET_SESSION_STATE,
        payload: {
            value: sessionState
        }
    }
}

/**
 * Add new image to figure drawing session.
 * @param {*} image - image representation (base64 string) + metadata
 * @returns action object
 */
export const addSessionImage = image => {
    return {
        type: FigureDrawingActionTypes.ADD_SESSION_IMAGE,
        payload: {
            value: image
        }
    }
}

/**
 * Sets duration per image in figure drawing session.
 * @param {*} duration - value in seconds
 * @returns action object
 */
export const setImageDuration = duration => {
    return {
        type: FigureDrawingActionTypes.SET_IMAGE_DURATION,
        payload: {
            value: duration
        }
    }
}

/**
 * Sets maximum number of images for figure drawing session.
 * @param {*} maxImages - max number of images
 * @returns action object
 */
export const setMaxImages = maxImages => {
    return {
        type: FigureDrawingActionTypes.SET_MAX_IMAGES,
        payload: {
            value: maxImages
        }
    }
}

/**
 * Sets sort order for images loaded into figure drawing session.
 * @param {*} sortOrder - sort order
 * @returns action object
 */
export const setSortOrder = sortOrder => {
    return {
        type: FigureDrawingActionTypes.SET_SORT_ORDER,
        payload: {
            value: sortOrder
        }
    }
}

/**
 * Set initial session history based on data loaded from disk.
 * @param {*} history - session history
 * @returns action object
 */
export const initSessionHistory = history => {
    return {
        type: FigureDrawingActionTypes.INIT_SESSION_HISTORY,
        payload: {
            value: history
        }
    }
}

/**
 * Adds completed figure drawing session stats to history.
 * @param {*} session - session stats
 * @returns action object
 */
export const appendToSessionHistory = session => {
    return {
        type: FigureDrawingActionTypes.APPEND_TO_SESSION_HISTORY,
        payload: {
            value: session
        }
    }
}

export default handleSettings;