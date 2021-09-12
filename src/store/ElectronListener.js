import { connect } from 'react-redux';

import { addPicture } from "./ImageCacheReducer";
import { RECEIVER_CHANNEL } from "../constants";

// kludge to separate out async return from the canvas itself
const ElectronListener = props => {
    window.api.receive(RECEIVER_CHANNEL, (data) => {
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
