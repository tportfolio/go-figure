import { connect } from 'react-redux';

const ADD_PICTURE_ACTION = "ADD_PICTURE";
const UPDATE_PICTURE_STATE = "UPDATE_PICTURE_STATE";

const initialState = {
    pictures: [],
    pictureProperties: {}
};

export const managePictures = (state = initialState, action) => {
    switch (action.type) {
        //TODO: combine pictures and pictureProperties (just initialize with empty object for properties)
        case ADD_PICTURE_ACTION:
            return {
                ...state,
                pictures: [...state.pictures, action.payload.picture]
            }
        case UPDATE_PICTURE_STATE:
            return {
                ...state,
                pictureProperties : {...state.pictureProperties, [action.payload.data]: action.payload.dimensions}
            }
        default:
            return state;
    }
}

export const addPicture = picture => {
    console.log("hit add picture with ", picture);
    return {
        type: ADD_PICTURE_ACTION,
        payload: {
            picture: picture
        }
    }
};

export const updatePictureState = picture => {
    console.log("hit update picture with ", picture);
    return {
        type: UPDATE_PICTURE_STATE,
        payload: {
            data: picture.data,
            dimensions: picture.dimensions
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
