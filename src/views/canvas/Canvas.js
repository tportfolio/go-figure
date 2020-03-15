import React from 'react';
import { connect } from 'react-redux';
import keys from "lodash/keys";
import { SketchField, Tools } from 'react-sketch';
import { useHotkeys } from 'react-hotkeys-hook';
import classNames from "classnames";

import CanvasToolbar from "./CanvasToolbar";
import ModifiableImage from "../../components/ModifiableImage";
import { updateGlobalPictureState, selectAllPictures, clearSelection, deleteSelectedImages } from "../../store/ImageCacheReducer";
import { toggleEnabledState } from "../../store/CanvasSettingsReducer";
import "./canvas.css";

const Canvas = props => {
    const { pictures, isCanvasEnabled, updateGlobalPictureProperties, toggleCanvasEnabledState, selectAllPictures, clearSelection, deleteSelected } = props;
    let canvasProps = { tool: Tools.Pencil, lineColor: 'black', lineWidth: 3 };
    const [canvasHeight, setCanvasHeight] = React.useState(null);
    const canvasDivRef = React.useRef();

    if (canvasHeight) {
        canvasProps = { ...canvasProps, height: canvasHeight, className: classNames({"disabled-canvas": !isCanvasEnabled})};
    }

    //TODO: listen for resize
    React.useEffect(() => {
        setCanvasHeight(canvasDivRef.current.offsetHeight);
    }, []);
    
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
    useHotkeys('ctrl+a', () => selectAllPictures());
    useHotkeys('ctrl+d', () => clearSelection());
    useHotkeys('del', () => deleteSelected());

    return (
        <>
            <CanvasToolbar />
            {keys(pictures).map(key => (
                <div key={key}>
                    <ModifiableImage data={pictures[key]} hash={key} />
                </div>
            ))}
            <div id="canvas-div" ref={canvasDivRef}>
                <SketchField {...canvasProps} />
            </div>
        </>
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
        updateGlobalPictureProperties: properties => dispatch(updateGlobalPictureState(properties)),
        toggleCanvasEnabledState: () => dispatch(toggleEnabledState()),
        selectAllPictures: () => dispatch(selectAllPictures()),
        clearSelection: () => dispatch(clearSelection()),
        deleteSelected: () => dispatch(deleteSelectedImages())
    }
};

// 1. canvas only cares when the number of pictures changes on the screen; the pictures themselves are self-managing
// 2. canvas needs to know when hot key for canvas enabling has changed
const isEqual = (prevProps, nextProps) =>{
    const isKeyLengthEqual = keys(prevProps.pictures).length === keys(nextProps.pictures).length;
    const isCanvasStateEqual = prevProps.isCanvasEnabled === nextProps.isCanvasEnabled;
    return isKeyLengthEqual && isCanvasStateEqual;
} 

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Canvas, isEqual));