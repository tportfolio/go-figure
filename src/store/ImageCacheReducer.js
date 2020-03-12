import pull from "lodash/pull";
import { imageHash } from "../utils/utils";

const ADD_PICTURE_ACTION = "ADD_PICTURE";
const UPDATE_PICTURE_STATE = "UPDATE_PICTURE_STATE";
const TOGGLE_PICTURE_SELECTION = "TOGGLE_PICTURE_SELECTION";

const initialState = {
    pictures: {},
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
                pictures: updateModifiableImage(state, action.payload.hash, action.payload.updatedProperties)
            };
        case TOGGLE_PICTURE_SELECTION:
            return {
                ...state,
                selectedPictures: toggleModifiableImageSelection(state, action.payload.hash)
            };
        default:
            return state;
    }
}

const addNewModifiableImage = (state, data) => {
    const hash = imageHash(data);
    return { ...state.pictures, [hash]: { data: data } };
};

const updateModifiableImage = (state, hash, properties) => {
    return { ...state.pictures, [hash]: Object.assign({ ...state.pictures[hash] }, properties) };
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

export const togglePictureSelection = hash => {
    return {
        type: TOGGLE_PICTURE_SELECTION,
        payload: {
            hash: hash
        }
    }
};

export default managePictures;