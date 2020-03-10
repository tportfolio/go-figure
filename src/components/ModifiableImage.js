import React from 'react';
import { connect } from 'react-redux';
import { Rnd } from 'react-rnd';
import { updatePictureState, togglePictureSelection } from "../store/reducer";
import { base64StringToBlob } from 'blob-util';
import "./image.css";
import classNames from "classnames";
import isEqual from "lodash/isEqual";

const ModifiableImage = props => {
    const { data, cachedProperties, selectedPictures, updateProperties, togglePictureSelection } = props;
    const { dimensions: cachedDimensions } = cachedProperties;
    const [dimensions, setDimensions] = React.useState(cachedDimensions ? cachedDimensions : { height: 0, width: 0 });
    const cachedPosition = cachedProperties.position ? cachedProperties.position : { x: 0, y: 0 };
    
    const ref = React.useRef();
    const onLoad = target => setDimensions({ height: target.height, width: target.width });

    const blob = React.useMemo(() => URL.createObjectURL(base64StringToBlob(data, "image/png")), [data]);
    let imgProps = React.useMemo(() => ({ ref: ref, src: blob, onLoad: e => onLoad(e.target) }), [blob]);

    const { height, width } = dimensions;
    if (height && width) {
        imgProps = { ...imgProps, height: height, width: width };
    }

    const className = classNames({ selected: selectedPictures.includes(data) });

    const onDragStop = (e, position) => {
         if (position.x === cachedPosition.x && position.y === cachedPosition.y) {
            togglePictureSelection(data);
        } else {
            updateProperties(data, { position: { x: position.x, y: position.y } });
        }
    }

    return (
            <Rnd style={{ zIndex: 9 }} lockAspectRatio={true} default={cachedPosition}
                onResize={(e, direction, ref, delta, position) => {
                    setDimensions({ height: ref.style.height, width: ref.style.width });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    updateProperties(data, { dimensions: { height: ref.style.height, width: ref.style.width }, position: position });
                }}
                onDragStop={onDragStop}
            >
        <img {...imgProps} draggable={false} className={className}
        />
        </Rnd>
    );
};

const mapStateToProps = (state, ownProps) => {
    const cachedProperties = state.pictures[ownProps.data];
    return {
        cachedProperties: cachedProperties ? cachedProperties : {},
        selectedPictures: state.selectedPictures
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateProperties: (data, properties) => dispatch(updatePictureState(data, properties)),
        togglePictureSelection: data => dispatch(togglePictureSelection(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifiableImage);