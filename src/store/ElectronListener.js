import { connect } from 'react-redux';

import { addPicture } from "./ImageCacheReducer";
import { RECEIVER_CHANNEL } from "../constants";


/**
 * Kludge to separate out async return from the canvas itself.
 * @param {*} props - data (base64 string)
 * @returns null (not meant to be visible as part of the GUI)
 */
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
