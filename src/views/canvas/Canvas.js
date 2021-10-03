import React from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import keys from "lodash/keys";
import { SketchField, Tools } from 'react-sketch';
import { useHotkeys } from 'react-hotkeys-hook';
import classNames from "classnames";
import * as logger from 'loglevel';
import { makeStyles } from '@mui/styles';

import CanvasToolbar from "./CanvasToolbar";
import ModifiableImage from "./ModifiableImage";
import { toggleWritingEnabled } from "../../store/CanvasSettingsReducer";
import {
    updateSelectedPictureProperties,
    selectAllPictures,
    clearSelection,
    deleteSelectedImages,
    toggleSelectedPictureProperty,
    addPicture
} from "../../store/ImageCacheReducer";

import "./canvas.css";

const Canvas = props => {
    const useStyles = makeStyles(theme => ({
        canvas: {
            marginLeft: theme.spacing(7)
        }
    }));

    const [canvasHeight, setCanvasHeight] = React.useState(window.innerHeight);

    React.useEffect(() => {
        const handleResize = () => setCanvasHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
     }, []);

    // redux data:
    const { pictures, isCanvasWritingEnabled } = props;

    // redux setters:
    const { updateSelectedPictureProperties, toggleCanvasEnabledState, selectAllPictures, clearSelection, deleteSelected, toggleSelectedPictureProperty } = props;

    let canvasProps = { tool: Tools.Pencil, lineColor: 'black', lineWidth: 3 };
    if (canvasHeight) {
        canvasProps = { ...canvasProps, height: canvasHeight, className: classNames({ "disabled-canvas": !isCanvasWritingEnabled }) };
    }

    const onDrop = acceptedFiles => {
        for (let f of acceptedFiles) {
            logger.debug(`Received file from drag 'n' drop with name ${f.name} and size ${f.size}`);
            const reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onload = () => {
                const base64Data = reader.result.split(',')[1];
                props.addPicture({ data: base64Data });
            };
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true })

    useHotkeys('1', () => updateSelectedPictureProperties({ opacity: 0.1 }));
    useHotkeys('2', () => updateSelectedPictureProperties({ opacity: 0.2 }));
    useHotkeys('3', () => updateSelectedPictureProperties({ opacity: 0.3 }));
    useHotkeys('4', () => updateSelectedPictureProperties({ opacity: 0.4 }));
    useHotkeys('5', () => updateSelectedPictureProperties({ opacity: 0.5 }));
    useHotkeys('6', () => updateSelectedPictureProperties({ opacity: 0.6 }));
    useHotkeys('7', () => updateSelectedPictureProperties({ opacity: 0.7 }));
    useHotkeys('8', () => updateSelectedPictureProperties({ opacity: 0.8 }));
    useHotkeys('9', () => updateSelectedPictureProperties({ opacity: 0.9 }));
    useHotkeys('0', () => updateSelectedPictureProperties({ opacity: 1 }));
    useHotkeys('c', () => toggleCanvasEnabledState());
    useHotkeys('ctrl+a', e => {
        e.preventDefault(); // don't want the standard select all behavior from browser
        selectAllPictures();
    });
    useHotkeys('ctrl+d', () => clearSelection());
    useHotkeys('del', () => deleteSelected());
    useHotkeys('h', () => toggleSelectedPictureProperty("mirrorH"));
    useHotkeys('v', () => toggleSelectedPictureProperty("mirrorV"));

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
    const isKeyLengthEqual = keys(prevProps.pictures).length === keys(nextProps.pictures).length;
    const isCanvasStateEqual = prevProps.isCanvasWritingEnabled === nextProps.isCanvasWritingEnabled;
    return isKeyLengthEqual && isCanvasStateEqual;
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Canvas, isEqual));