import { connect } from 'react-redux';

const ADD_PICTURE_ACTION = "ADD_PICTURE";

const initialState = {
    pictures: []
};

export const managePictures = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PICTURE_ACTION:
            return {
                ...state,
                pictures: [...state.pictures, action.payload.picture]
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
