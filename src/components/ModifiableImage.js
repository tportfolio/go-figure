import React from 'react';
import { connect } from 'react-redux';
import { Rnd } from 'react-rnd';
import { updatePictureState } from "../store/reducer";
import { base64StringToBlob } from 'blob-util';

const ModifiableImage = props => {
    const { data, cachedProperties, updateProperties } = props;
    const { dimensions: cachedDimensions } = cachedProperties;
    const cachedPosition = cachedProperties.position ? cachedProperties.position : { x: 0, y: 0 };
    const [dimensions, setDimensions] = React.useState(cachedDimensions ? cachedDimensions : { height: 0, width: 0 });

    const onLoad = target => setDimensions({ height: target.height, width: target.width });
    const blob = React.useMemo(() => URL.createObjectURL(base64StringToBlob(data, "image/png")), [data]);
    let imgProps = React.useMemo(() => ({ draggable: false, src: blob, onLoad: e => onLoad(e.target) }), [blob]);

    const { height, width } = dimensions;
    if (height && width) {
        imgProps = { ...imgProps, height: height, width: width };
    }

    return (
        <Rnd style={{ zIndex: 9 }} lockAspectRatio={true} default={cachedPosition}
            onResize={(e, direction, ref, delta, position) => {
                setDimensions({ height: ref.style.height, width: ref.style.width });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                updateProperties(data, { dimensions: { height: ref.style.height, width: ref.style.width }, position: position });
            }}
            onDragStop={(e, position) => {
                updateProperties(data, { position: { x: position.x, y: position.y } });
            }}
        >
            <img {...imgProps} />
        </Rnd>
    );
};

const mapStateToProps = (state, ownProps) => {
    const cachedProperties = state.pictures[ownProps.data];
    return {
        cachedProperties: cachedProperties ? cachedProperties : {}
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateProperties: (data, properties) => dispatch(updatePictureState(data, properties))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifiableImage);