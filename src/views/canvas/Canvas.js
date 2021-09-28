import React from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import keys from "lodash/keys";
import { SketchField, Tools } from 'react-sketch';
import { useHotkeys } from 'react-hotkeys-hook';
import classNames from "classnames";
import * as logger from 'loglevel';
import { makeStyles, withTheme } from '@mui/styles';
import { SelectableGroup } from 'react-selectable-fast';

import CanvasToolbar from "./CanvasToolbar";
import ModifiableImage from "./ModifiableImage";
import { toggleEnabledState } from "../../store/CanvasSettingsReducer";
import {
    updateGlobalPictureState,
    selectAllPictures,
    clearSelection,
    deleteSelectedImages,
    toggleGlobalPictureState,
    addPicture
} from "../../store/ImageCacheReducer";

import "./canvas.css";

const Canvas = props => {
    const useStyles = makeStyles(theme => ({
        canvas: {
            marginLeft: theme.spacing(7)
        }
    }));

    // redux data:
    const { pictures, isCanvasEnabled } = props;

    // redux setters:
    const { updateGlobalPictureProperties, toggleCanvasEnabledState, selectAllPictures, clearSelection, deleteSelected, toggleGlobalPictureState } = props;

    let canvasProps = { tool: Tools.Pencil, lineColor: 'black', lineWidth: 3 };
    const [canvasHeight, setCanvasHeight] = React.useState(null);
    const canvasDivRef = React.useRef();

    if (canvasHeight) {
        canvasProps = { ...canvasProps, height: canvasHeight, className: classNames({ "disabled-canvas": !isCanvasEnabled }) };
    }

    //TODO: listen for resize
    React.useEffect(() => {
        setCanvasHeight(canvasDivRef.current.offsetHeight);
    }, []);

    const onDrop = acceptedFiles => {
        for (let f of acceptedFiles) {
            console.log(`Received file from drag 'n' drop with name ${f.name} and size ${f.size}`);
            const reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onload = () => {
                const base64Data = reader.result.split(',')[1];
                props.addPicture({ data: base64Data });
            };
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true })

    useHotkeys('1', () => updateGlobalPictureProperties({ opacity: 0.1 }));
    useHotkeys('2', () => updateGlobalPictureProperties({ opacity: 0.2 }));
    useHotkeys('3', () => updateGlobalPictureProperties({ opacity: 0.3 }));
    useHotkeys('4', () => updateGlobalPictureProperties({ opacity: 0.4 }));
    useHotkeys('5', () => updateGlobalPictureProperties({ opacity: 0.5 }));
    useHotkeys('6', () => updateGlobalPictureProperties({ opacity: 0.6 }));
    useHotkeys('7', () => updateGlobalPictureProperties({ opacity: 0.7 }));
    useHotkeys('8', () => updateGlobalPictureProperties({ opacity: 0.8 }));
    useHotkeys('9', () => updateGlobalPictureProperties({ opacity: 0.9 }));
    useHotkeys('0', () => updateGlobalPictureProperties({ opacity: 1 }));
    useHotkeys('c', () => toggleCanvasEnabledState());
    useHotkeys('ctrl+a', e => {
        e.preventDefault(); // don't want the standard select all behavior from browser
        selectAllPictures();
    });
    useHotkeys('ctrl+d', () => clearSelection());
    useHotkeys('del', () => deleteSelected());
    useHotkeys('h', () => toggleGlobalPictureState("mirrorH"));
    useHotkeys('v', () => toggleGlobalPictureState("mirrorV"));

    const classes = useStyles();

    return (
        <div id="canvas-wrapper-div" className={classes.canvas}>
            <CanvasToolbar />
            <div>
                {Object.keys(pictures).map(k => <ModifiableImage key={k} metadata={pictures[k]} />)}
            </div>
            <div id="canvas-div" ref={canvasDivRef}>
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
        isCanvasEnabled: state.canvassettings.isEnabled
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addPicture: picture => dispatch(addPicture(picture)),
        updateGlobalPictureProperties: properties => dispatch(updateGlobalPictureState(properties)),
        toggleGlobalPictureState: property => dispatch(toggleGlobalPictureState(property)),
        toggleCanvasEnabledState: () => dispatch(toggleEnabledState()),
        selectAllPictures: () => dispatch(selectAllPictures()),
        clearSelection: () => dispatch(clearSelection()),
        deleteSelected: () => dispatch(deleteSelectedImages())
    }
};

// 1. canvas only cares when the number of pictures changes on the screen; the pictures themselves are self-managing
// 2. canvas needs to know when hot key for canvas enabling has changed
const isEqual = (prevProps, nextProps) => {
    const isKeyLengthEqual = keys(prevProps.pictures).length === keys(nextProps.pictures).length;
    const isCanvasStateEqual = prevProps.isCanvasEnabled === nextProps.isCanvasEnabled;
    return isKeyLengthEqual && isCanvasStateEqual;
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Canvas, isEqual));