import { connect } from 'react-redux';

const ADD_PICTURE_ACTION = "ADD_PICTURE";
const UPDATE_PICTURE_STATE = "UPDATE_PICTURE_STATE";

const initialState = {
    pictures: {}
};

export const managePictures = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PICTURE_ACTION:
            return {
                ...state,
                pictures: {...state.pictures, [action.payload.data]: {}}
            }
        case UPDATE_PICTURE_STATE:
            return {
                ...state,
                pictures : {...state.pictures, [action.payload.data]: Object.assign(state.pictures[action.payload.data], action.payload.updatedProperties)}
            }
        default:
            return state;
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

// kludge to separate out async return from the canvas itself
const ElectronListener = props => {
    window.api.receive("fromMain", (data) => {
        console.log(`Received ${data} from main process`);
        props.addPicture(data);
    });   

    return null;
}

const mapDispatchToProps = dispatch => {
    return {
        addPicture: picture => dispatch(addPicture(picture))
    }
};   

export default connect(null, mapDispatchToProps)(ElectronListener);
