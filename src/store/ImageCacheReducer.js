import pull from "lodash/pull";
import { imageHash } from "../utils/utils";
import keys from "lodash/keys";
import omit from "lodash/omit";
import { base64StringToBlob } from 'blob-util';


const ADD_PICTURE_ACTION = "ADD_PICTURE";
const UPDATE_PICTURE_STATE = "UPDATE_PICTURE_STATE";
const TOGGLE_PICTURE_SELECTION = "TOGGLE_PICTURE_SELECTION";
const UPDATE_GLOBAL_PICTURE_STATE = "UPDATE_GLOBAL_PICTURE_STATE";
const SELECT_ALL_PICTURES = "SELECT_ALL_PICTURES";
const CLEAR_SELECTION = "CLEAR_SELECTION";
const DELETE_SELECTED = "DELETE_SELECTED";
const TOGGLE_GLOBAL_PICTURE_STATE = "TOGGLE_GLOBAL_PICTURE_STATE";

const initialState = {
    pictures: {},               // k: hash, v: metadata (filename, size, blob, etc.)
    pictureProperties: {},      // properties only (k: hash, v: {...})
    selectedPictures: []
};

export const managePictures = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PICTURE_ACTION:
            return {
                ...state,
                pictures: addNewModifiableImage(state, action.payload.data)
            };
        case UPDATE_PICTURE_STATE:
            return {
                ...state,
                pictureProperties: updateImageProperties(state, action.payload.hash, action.payload.updatedProperties)
            };
        case TOGGLE_PICTURE_SELECTION:
            return {
                ...state,
                selectedPictures: toggleModifiableImageSelection(state, action.payload.hash, action.payload.isCtrlKeyPressed)
            };
        case UPDATE_GLOBAL_PICTURE_STATE:
            return {
                ...state,
                pictureProperties: updateGlobalImageProperties(state, action.payload.updatedProperties)
            };
        case TOGGLE_GLOBAL_PICTURE_STATE:
            return {
                ...state,
                pictureProperties: toggleGlobalImageProperty(state, action.payload.propertyToToggle)
            }
        case SELECT_ALL_PICTURES:
            return {
                ...state,
                selectedPictures: keys(state.pictures)
            };
        case CLEAR_SELECTION:
            return {
                ...state,
                selectedPictures: []
            };
        case DELETE_SELECTED:
            return {
                ...state,
                ...removePictures(state)
            }
        default:
            return state;
    }
}

const addNewModifiableImage = (state, value) => {
    const hash = imageHash(value.data);
    const blob = URL.createObjectURL(base64StringToBlob(value.data, "image/png"));
    const {filename, filesize} = value;
    return { ...state.pictures, [hash]: {hash, blob, filename, filesize} };
};

const updateImageProperties = (state, hash, properties) => {
    return { ...state.pictureProperties, [hash]: Object.assign({ ...state.pictureProperties[hash] }, properties) };
};

const updateGlobalImageProperties = (state, properties) => {
    const updatedImages = [...state.selectedPictures].map(hash => ({ [hash]: Object.assign({ ...state.pictureProperties[hash] }, properties) }));
    return Object.assign({ ...state.pictureProperties }, ...updatedImages);
};

const toggleGlobalImageProperty = (state, property) => {
    const updatedImages = [...state.selectedPictures].map(hash => ({ [hash]: { ...state.pictureProperties[hash], [property]: !state.pictureProperties[hash][property] } }));
    return Object.assign({ ...state.pictureProperties }, ...updatedImages);
};

const toggleModifiableImageSelection = (state, hash, isCtrlKeyPressed) => {
    let result;
    if (isCtrlKeyPressed) {
        if (state.selectedPictures.includes(hash)) {
            result = pull([...state.selectedPictures], hash);
        } else {
            result = [...state.selectedPictures, hash];
        }
    } else {
        result = [hash];
    }
    return result;
};

const removePictures = state => {
    const updatedData = omit(state.pictures, state.selectedPictures);
    const updatedProperties = omit(state.pictureProperties, state.selectedPictures);
    return {
        pictures: updatedData,
        pictureProperties: updatedProperties,
        selectedPictures: []
    };
};


/*
* dispatch methods
*/

export const addPicture = data => {
    return {
        type: ADD_PICTURE_ACTION,
        payload: {
            data: data
        }
    }
};

export const updatePictureState = (hash, updatedProperties) => {
    return {
        type: UPDATE_PICTURE_STATE,
        payload: {
            hash: hash,
            updatedProperties: updatedProperties
        }
    }
};

export const updateGlobalPictureState = (updatedProperties) => {
    return {
        type: UPDATE_GLOBAL_PICTURE_STATE,
        payload: {
            updatedProperties: updatedProperties
        }
    }
};

export const toggleGlobalPictureState = propertyToToggle => {
    return {
        type: TOGGLE_GLOBAL_PICTURE_STATE,
        payload: {
            propertyToToggle: propertyToToggle
        }
    }
};

export const togglePictureSelection = (hash, isCtrlKeyPressed) => {
    return {
        type: TOGGLE_PICTURE_SELECTION,
        payload: {
            hash: hash,
            isCtrlKeyPressed: isCtrlKeyPressed
        }
    }
};

export const selectAllPictures = () => {
    return {
        type: SELECT_ALL_PICTURES,
        payload: {}
    }
}


export const clearSelection = () => {
    return {
        type: CLEAR_SELECTION,
        payload: {}
    }
}

export const deleteSelectedImages = () => {
    return {
        type: DELETE_SELECTED,
        payload: {}
    }
}


export default managePictures;