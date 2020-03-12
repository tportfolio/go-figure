import React from 'react';
import { connect } from 'react-redux';
import { Rnd } from 'react-rnd';
import { updatePictureState, togglePictureSelection } from "../store/ImageCacheReducer";
import { base64StringToBlob } from 'blob-util';
import "./image.css";
import classNames from "classnames";
import ImageSlider from "./ImageSlider";

const ModifiableImage = props => {
    const { data, hash, cachedProperties, updateProperties, togglePictureSelection, isSelected } = props;
    const { dimensions: cachedDimensions } = cachedProperties;
    const [dimensions, setDimensions] = React.useState(cachedDimensions ? cachedDimensions : { height: 0, width: 0 });
    const cachedPosition = cachedProperties.position ? cachedProperties.position : { x: 0, y: 0 };

    const ref = React.useRef();
    const onLoad = target => setDimensions({ height: target.height, width: target.width });

    const className = classNames({ selected: isSelected });
    const blob = React.useMemo(() => URL.createObjectURL(base64StringToBlob(data, "image/png")), [data]);
    let imgProps = React.useMemo(() => ({ ref: ref, src: blob, onLoad: e => onLoad(e.target) }), [blob]);

    const { height, width } = dimensions;    
    if (height && width) {
        imgProps = { ...imgProps, height: height, width: width };
    }


    const onDragStop = (e, position) => {
        if (position.x === cachedPosition.x && position.y === cachedPosition.y) {
            togglePictureSelection(hash);
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
            <img {...imgProps} draggable={false} className={className} />
        </Rnd>
    );
};

const mapStateToProps = (state, ownProps) => {
    const cachedProperties = state.imagecache.pictures[ownProps.hash];
    return {
        cachedProperties: cachedProperties ? cachedProperties : {},
        isSelected: state.imagecache.selectedPictures.includes(ownProps.hash)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateProperties: (hash, properties) => dispatch(updatePictureState(hash, properties)),
        togglePictureSelection: hash => dispatch(togglePictureSelection(hash))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifiableImage);