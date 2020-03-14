import pull from "lodash/pull";
import { imageHash } from "../utils/utils";

const ADD_PICTURE_ACTION = "ADD_PICTURE";
const UPDATE_PICTURE_STATE = "UPDATE_PICTURE_STATE";
const TOGGLE_PICTURE_SELECTION = "TOGGLE_PICTURE_SELECTION";
const UPDATE_GLOBAL_PICTURE_STATE = "UPDATE_GLOBAL_PICTURE_STATE";

const initialState = {
    pictures: {},               // base64 data only (k: hash, v: base64 data)
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
                selectedPictures: toggleModifiableImageSelection(state, action.payload.hash)
            };
        case UPDATE_GLOBAL_PICTURE_STATE:
            console.log("entered update");
            return {
                ...state,
                pictureProperties: updateGlobalImageProperties(state, action.payload.updatedProperties)
            };
        default:
            return state;
    }
}

const addNewModifiableImage = (state, data) => {
    const hash = imageHash(data);
    return { ...state.pictures, [hash]: data };
};

const updateImageProperties = (state, hash, properties) => {
    return { ...state.pictureProperties, [hash]: Object.assign({ ...state.pictureProperties[hash] }, properties) };
};

const updateGlobalImageProperties = (state, properties) => {
    const updatedImages = [...state.selectedPictures].map(hash => ({[hash]: Object.assign({ ...state.pictureProperties[hash] }, properties)}));
    return Object.assign({...state.pictureProperties}, ...updatedImages);
};

const toggleModifiableImageSelection = (state, hash) => {
    let result;
    if (state.selectedPictures.includes(hash)) {
        result = pull([...state.selectedPictures], hash);
    } else {
        result = [...state.selectedPictures, hash];
    }
    return result;
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
    console.log('entered updateglobalpicturestate');
    return {
        type: UPDATE_GLOBAL_PICTURE_STATE,
        payload: {
            updatedProperties: updatedProperties
        }
    }
};

export const togglePictureSelection = hash => {
    return {
        type: TOGGLE_PICTURE_SELECTION,
        payload: {
            hash: hash
        }
    }
};

export default managePictures;