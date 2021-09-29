import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as logger from 'loglevel';

import { addPicture } from "./ImageCacheReducer";
import { addSessionImage, initSessionHistory } from './FigureDrawingReducer';
import { channels } from "../channels";

/**
 * Kludge to separate out async return from the canvas itself.
 * @param {*} props - data (base64 string)
 * @returns null (not meant to be visible as part of the GUI)
 */
const ElectronListener = props => {
    useEffect(() => {
        window.api.send(channels.STATS_LOAD_FROM_FILE);
    });

    window.api.receive(channels.CANVAS_REQUEST_FILES_CALLBACK, data => {
        logger.trace(`Received ${data} from main process`);
        props.addPicture(data);
    });   

    window.api.receive(channels.FIGURE_DRAWING_REQUEST_FILES_CALLBACK, data => {
        logger.info(`Received ${data.filename} of size ${data.filesize} for figure drawing session`);
        props.addSessionImage(data);
    });   

    window.api.receive(channels.STATS_LOAD_CALLBACK, data => {
        logger.info(`Received session history: ${JSON.stringify(data)}`);
        props.initSessionHistory(data);
    })

    return null;
}

const mapDispatchToProps = dispatch => {
    return {
        addPicture: picture => dispatch(addPicture(picture)),
        addSessionImage: images => dispatch(addSessionImage(images)),
        initSessionHistory: history => dispatch(initSessionHistory(history))
    }
};   

export default connect(null, mapDispatchToProps)(ElectronListener);
