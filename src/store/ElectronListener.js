import { connect } from 'react-redux';
import * as logger from 'loglevel';

import { addPicture } from "./ImageCacheReducer";
import { addSessionImage } from './FigureDrawingReducer';
import { RECEIVER_CHANNEL, FIGURE_DRAWING_FILE_RECEIVER_CHANNEL } from "../constants";


/**
 * Kludge to separate out async return from the canvas itself.
 * @param {*} props - data (base64 string)
 * @returns null (not meant to be visible as part of the GUI)
 */
const ElectronListener = props => {
    window.api.receive(RECEIVER_CHANNEL, (data) => {
        logger.trace(`Received ${data} from main process`);
        props.addPicture(data);
    });   

    window.api.receive(FIGURE_DRAWING_FILE_RECEIVER_CHANNEL, (data) => {
        logger.info(`Received ${data.filename} of size ${data.filesize} for figure drawing session`);
        props.addSessionImage(data);
    });   

    return null;
}

const mapDispatchToProps = dispatch => {
    return {
        addPicture: picture => dispatch(addPicture(picture)),
        addSessionImage: images => dispatch(addSessionImage(images))
    }
};   

export default connect(null, mapDispatchToProps)(ElectronListener);
