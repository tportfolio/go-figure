import { omit } from 'lodash';
import { createImageObject } from './reducerUtils';

// valid action types for image cache reducer
const ImageCacheActionTypes = Object.freeze({
    ADD_PICTURE_ACTION: "ADD_PICTURE",
    UPDATE_PICTURE_STATE: "UPDATE_PICTURE_STATE",
    TOGGLE_PICTURE_SELECTION: "TOGGLE_PICTURE_SELECTION",
    UPDATE_SELECTED_PICTURE_PROPERTIES: "UPDATE_SELECTED_PICTURE_PROPERTIES",
    SELECT_ALL_PICTURES: "SELECT_ALL_PICTURES",
    CLEAR_SELECTION: "CLEAR_SELECTION",
    DELETE_SELECTED: "DELETE_SELECTED",
    TOGGLE_SELECTED_PICTURE_PROPERTY: "TOGGLE_SELECTED_PICTURE_PROPERTY"
});

// state representation for image cache
const initialState = {
    pictures: {},               // k: hash, v: file metadata (filename, size, blob, etc.)
    pictureProperties: {},      // k: hash, v: current properties (x, y, height, width, etc.)
    selectedPictures: []
};

/**
 * Update image cache settings based on incoming action.
 * @param {*} state - current state
 * @param {*} action - incoming action
 * @returns updated state
 */
export const managePictures = (state = initialState, action) => {
    switch (action.type) {
        case ImageCacheActionTypes.ADD_PICTURE_ACTION: {
            return {
                ...state,
                pictures: { ...state.pictures, ...createImageObject(action.payload.value) }
            };
        }
        case ImageCacheActionTypes.UPDATE_PICTURE_STATE: {
            const { hash, updatedProperties } = action.payload;
            return {
                ...state,
                pictureProperties: { ...state.pictureProperties, [hash]: { ...state.pictureProperties[hash], ...updatedProperties } }
            };
        }
        case ImageCacheActionTypes.TOGGLE_PICTURE_SELECTION: {
            const { hash, isCtrlKeyPressed } = action.payload;

            // if regular click, just set list equal to clicked picture; with CTRL mask, "toggle" hash in list
            let newSelectedPictures = [hash];
            if (isCtrlKeyPressed) {
                if (state.selectedPictures.includes(hash)) {
                    newSelectedPictures = state.selectedPictures.filter(value => value !== hash);
                } else {
                    newSelectedPictures = [...state.selectedPictures, hash];
                }
            }
            return {
                ...state,
                selectedPictures: newSelectedPictures
            };
        }
        case ImageCacheActionTypes.UPDATE_SELECTED_PICTURE_PROPERTIES: {
            // apply property change to all selected pictures
            const updatedImages = state.selectedPictures.reduce((acc, hash) => {
                acc[hash] = { ...state.pictureProperties[hash], ...action.payload.updatedProperties };
                return acc;
            }, {});

            return {
                ...state,
                pictureProperties: { ...state.pictureProperties, ...updatedImages }
            };
        }
        case ImageCacheActionTypes.TOGGLE_SELECTED_PICTURE_PROPERTY: {
            // toggle boolean property for all selected pictures
            const { propertyToToggle: property } = action.payload;
            const toggledPropImages = state.selectedPictures.reduce((acc, hash) => {
                acc[hash] = { ...state.pictureProperties[hash], [property]: !state.pictureProperties[hash][property] };
                return acc;
            }, {});

            return {
                ...state,
                pictureProperties: { ...state.pictureProperties, ...toggledPropImages }
            }
        }
        case ImageCacheActionTypes.SELECT_ALL_PICTURES: {
            return {
                ...state,
                selectedPictures: Object.keys(state.pictures)
            };
        }
        case ImageCacheActionTypes.CLEAR_SELECTION: {
            return {
                ...state,
                selectedPictures: []
            };
        }
        case ImageCacheActionTypes.DELETE_SELECTED: {
            return {
                ...state,
                pictures: omit(state.pictures, state.selectedPictures),
                pictureProperties: omit(state.pictureProperties, state.selectedPictures),
                selectedPictures: []
            }
        }
        default:
            return state;
    }
}

/**
 * Add picture to canvas.
 * @param {*} picture - picture metadata
 * @returns action object
 */
export const addPicture = picture => {
    return {
        type: ImageCacheActionTypes.ADD_PICTURE_ACTION,
        payload: {
            value: picture
        }
    }
};

/**
 * Update properties of a picture on the canvas.
 * @param {*} hash - hash of image
 * @param {*} updatedProperties - properties to update
 * @returns action object
 */
export const updatePictureState = (hash, updatedProperties) => {
    return {
        type: ImageCacheActionTypes.UPDATE_PICTURE_STATE,
        payload: {
            hash: hash,
            updatedProperties: updatedProperties
        }
    }
};

/**
 * Update properties of all selected pictures on canvas.
 * @param {*} updatedProperties - properties to update
 * @returns action object
 */
export const updateSelectedPictureProperties = (updatedProperties) => {
    return {
        type: ImageCacheActionTypes.UPDATE_SELECTED_PICTURE_PROPERTIES,
        payload: {
            updatedProperties: updatedProperties
        }
    }
};

/**
 * Toggle property of all selected pictures on canvas.
 * @param {*} propertyToToggle - property to toggle (e.g., mirror horizontally)
 * @returns action object
 */
export const toggleSelectedPictureProperty = propertyToToggle => {
    return {
        type: ImageCacheActionTypes.TOGGLE_SELECTED_PICTURE_PROPERTY,
        payload: {
            propertyToToggle: propertyToToggle
        }
    }
};

/**
 * Select or deselect picture by hash.
 * @param {*} hash - hash of picture
 * @param {*} isCtrlKeyPressed - whether CTRL mask is on
 * @returns action object
 */
export const togglePictureSelection = (hash, isCtrlKeyPressed) => {
    return {
        type: ImageCacheActionTypes.TOGGLE_PICTURE_SELECTION,
        payload: {
            hash: hash,
            isCtrlKeyPressed: isCtrlKeyPressed
        }
    }
};

/**
 * Select all pictures on canvas.
 * @returns action object
 */
export const selectAllPictures = () => {
    return {
        type: ImageCacheActionTypes.SELECT_ALL_PICTURES
    }
}

/**
 * Clear selected picture list.
 * @returns action object
 */
export const clearSelection = () => {
    return {
        type: ImageCacheActionTypes.CLEAR_SELECTION
    }
}

/**
 * Delete selected pictures from canvas.
 * @returns action object
 */
export const deleteSelectedImages = () => {
    return {
        type: ImageCacheActionTypes.DELETE_SELECTED
    }
}

export default managePictures;