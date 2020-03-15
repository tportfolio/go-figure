import React from 'react';
import { connect } from 'react-redux';
import { Rnd } from 'react-rnd';
import { base64StringToBlob } from 'blob-util';
import classNames from "classnames";
import { useHotkeys } from 'react-hotkeys-hook';

import { updatePictureState, togglePictureSelection } from "../store/ImageCacheReducer";
import "./image.css";

const ModifiableImage = props => {
    // redux setters:
    const { updateProperties, togglePictureSelection, updateGlobalPictureProperties } = props;

    // redux/parent data:
    const { data, hash, cachedProperties, isSelected } = props;

    // initial image loading getting/setting
    const ref = React.useRef();
    const onLoad = target => setDimensions({ height: target.height, width: target.width });
    const blob = React.useMemo(() => URL.createObjectURL(base64StringToBlob(data, "image/png")), [data]);
    let imgProps = React.useMemo(() => ({ ref: ref, src: blob, draggable: false, onLoad: e => onLoad(e.target) }), [blob]);

    // dynamic image dimension setting via react-rnd
    const { dimensions: cachedDimensions } = cachedProperties;
    const [dimensions, setDimensions] = React.useState(cachedDimensions ? cachedDimensions : { height: 0, width: 0 });

    // other modifiable image props
    const cachedPosition = cachedProperties.position ? cachedProperties.position : { x: 0, y: 0 };
    const opacity = cachedProperties.opacity ? cachedProperties.opacity : 1;
    const className = classNames({ selected: isSelected });

    // if we've loaded the image, these can be added
    const { height, width } = dimensions;
    if (height && width) {
        imgProps = { ...imgProps, height: height, width: width, className: className, style: { opacity: opacity, userSelect: "none" } };
    }

    const onDragStop = (e, position) => {
        if (position.x === cachedPosition.x && position.y === cachedPosition.y) {
            togglePictureSelection(hash, e.ctrlKey);
        } else {
            updateProperties(hash, { position: { x: position.x, y: position.y } });
        }
    }

    return (
        <Rnd style={{ zIndex: 9 }} lockAspectRatio={true} default={cachedPosition}
            onResize={(e, direction, ref, delta, position) => {
                setDimensions({ height: ref.style.height, width: ref.style.width });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                updateProperties(hash, { dimensions: { height: ref.style.height, width: ref.style.width }, position: position });
            }}
            onDragStop={onDragStop}
        >
            <img {...imgProps} />
        </Rnd>
    );
};


const mapStateToProps = (state, ownProps) => {
    const cachedProperties = state.imagecache.pictureProperties[ownProps.hash];
    return {
        cachedProperties: cachedProperties ? cachedProperties : {},
        isSelected: state.imagecache.selectedPictures.includes(ownProps.hash)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateProperties: (hash, properties) => dispatch(updatePictureState(hash, properties)),
        togglePictureSelection: (hash, isCtrlKeyPressed) => dispatch(togglePictureSelection(hash, isCtrlKeyPressed)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifiableImage);