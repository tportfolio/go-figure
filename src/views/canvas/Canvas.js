import React from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import { SketchField, Tools } from 'react-sketch';
import { useHotkeys } from 'react-hotkeys-hook';
import classNames from 'classnames';
import { range } from 'lodash';
import { makeStyles } from '@mui/styles';
import * as logger from 'loglevel';

import CanvasToolbar from './CanvasToolbar';
import ModifiableImage from './ModifiableImage';
import { toggleWritingEnabled } from '../../store/CanvasSettingsReducer';
import {
    updateSelectedPictureProperties,
    selectAllPictures,
    clearSelection,
    deleteSelectedImages,
    toggleSelectedPictureProperty,
    addPicture
} from '../../store/ImageCacheReducer';

import './canvas.css';

/**
 * Representation of canvas route display.
 * @param {*} props 
 * @returns Canvas component
 */
const Canvas = props => {
    const [canvasHeight, setCanvasHeight] = React.useState(window.innerHeight);

    // adjust sketch canvas dimensions whenever window size updates
    React.useEffect(() => {
        const handleResize = () => setCanvasHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Redux data
    const { pictures, isCanvasWritingEnabled } = props;

    // Redux setters
    const {
        addPicture,
        updateSelectedPictureProperties,
        toggleCanvasEnabledState,
        selectAllPictures,
        clearSelection,
        deleteSelected,
        toggleSelectedPictureProperty
    } = props;

    let canvasProps = { tool: Tools.Pencil, lineColor: 'black', lineWidth: 3 };
    if (canvasHeight) {
        canvasProps = { ...canvasProps, height: canvasHeight, className: classNames({ "disabled-canvas": !isCanvasWritingEnabled }) };
    }

    /**
     * Load images that are dropped onto the canvas.
     * @param {*} acceptedFiles - image files
     */
    const onDrop = acceptedFiles => {
        for (let f of acceptedFiles) {
            logger.debug(`Received file from drag 'n' drop with name ${f.name} and size ${f.size}`);
            const reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onload = () => {
                const base64Data = reader.result.split(',')[1];
                addPicture({ data: base64Data });
            };
        }
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true })

    // single use hot keys
    useHotkeys('c', () => toggleCanvasEnabledState());
    useHotkeys('ctrl+a', e => {
        e.preventDefault(); // don't want the standard select all behavior from browser
        selectAllPictures();
    });
    useHotkeys('ctrl+d', () => clearSelection());
    useHotkeys('del', () => deleteSelected());
    useHotkeys('h', () => toggleSelectedPictureProperty("mirrorH"));
    useHotkeys('v', () => toggleSelectedPictureProperty("mirrorV"));

    // keys 0 to 9; written out to string as "0, 1, 2..."
    useHotkeys(range(10).map(i => i.toString()).join(', '), (_, handler) => {
        const keyToNum = Number(handler.key);
        const opacity = keyToNum === 0 ? 1 : keyToNum / 10;
        updateSelectedPictureProperties({ opacity });
    });

    // add margin to left side of view to account for sidebar
    const useStyles = makeStyles(theme => ({
        canvas: {
            marginLeft: theme.spacing(7)
        }
    }));
    const classes = useStyles();

    return (
        <div id="canvas-wrapper-div" className={classes.canvas}>
            <CanvasToolbar />
            <div>
                {Object.keys(pictures).map(k => <ModifiableImage key={k} metadata={pictures[k]} />)}
            </div>
            <div id="canvas-div">
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <SketchField {...canvasProps} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        pictures: state.imagecache.pictures,
        isCanvasWritingEnabled: state.canvassettings.isCanvasWritingEnabled
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addPicture: picture => dispatch(addPicture(picture)),
        updateSelectedPictureProperties: properties => dispatch(updateSelectedPictureProperties(properties)),
        toggleSelectedPictureProperty: property => dispatch(toggleSelectedPictureProperty(property)),
        toggleCanvasEnabledState: () => dispatch(toggleWritingEnabled()),
        selectAllPictures: () => dispatch(selectAllPictures()),
        clearSelection: () => dispatch(clearSelection()),
        deleteSelected: () => dispatch(deleteSelectedImages())
    }
};

// 1. canvas only cares when the number of pictures changes on the screen; the pictures themselves are self-managing
// 2. canvas needs to know when hot key for canvas enabling has changed
const isEqual = (prevProps, nextProps) => {
    const isKeyLengthEqual = Object.keys(prevProps.pictures).length === Object.keys(nextProps.pictures).length;
    const isCanvasStateEqual = prevProps.isCanvasWritingEnabled === nextProps.isCanvasWritingEnabled;
    return isKeyLengthEqual && isCanvasStateEqual;
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Canvas, isEqual));