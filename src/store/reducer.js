import pull from "lodash/pull";

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
                pictures: { ...state.pictures, [action.payload.data]: {} }
            }
        case UPDATE_PICTURE_STATE:
            return {
                ...state,
                pictures: { ...state.pictures, [action.payload.data]: Object.assign({...state.pictures[action.payload.data]}, action.payload.updatedProperties) }
            }
        case TOGGLE_PICTURE_SELECTION:
            const {data} = action.payload;
            let result;
            if (state.selectedPictures.includes(data)) {
                result = pull([...state.selectedPictures], data);
            } else {
                result = [...state.selectedPictures, action.payload.data];
            }
            return {
                ...state,
                selectedPictures: result
            }
        default:
            return state;
    }
}

export const togglePictureSelection = data => {
    return {
        type: TOGGLE_PICTURE_SELECTION,
        payload: {
            data: data
        }
    }
}


export const addPicture = data => {
    return {
        type: ADD_PICTURE_ACTION,
        payload: {
            data: data
        }
    }
};

export const updatePictureState = (data, updatedProperties) => {
    console.log("incoming properties are ", updatedProperties);
    return {
        type: UPDATE_PICTURE_STATE,
        payload: {
            data: data,
            updatedProperties: updatedProperties
        }
    }
};