import React from 'react';
import { connect } from 'react-redux';
import { Rnd } from 'react-rnd';
import { updatePictureState } from "../store/reducer";

const ModifiableImage = props => {
    const {data, cachedProperties, updateProperties} = props;
    const {dimensions: cachedDimensions} = cachedProperties;
    const cachedPosition = cachedProperties.position ? cachedProperties.position : {x: 0, y: 0};
    const [dimensions, setDimensions] = React.useState(cachedDimensions ? cachedDimensions : {height: 0, width: 0});
    const targetRef = React.useRef();
    
    React.useEffect(() => {
        console.log("Calling useEffect with dimensions", cachedDimensions);
        if (!cachedDimensions && targetRef.current) {
            const newDimensions = {height: targetRef.current.offsetHeight, width: targetRef.current.offsetWidth};
            setDimensions(newDimensions);
        }
    }, [cachedDimensions]);

    const {height, width} = dimensions;
    return (
        <Rnd ref={targetRef} style={{ zIndex: 9 }} lockAspectRatio={true} default={cachedPosition}
            onResize={(e, direction, ref, delta, position) => {
                setDimensions({ height: ref.style.height, width: ref.style.width });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                updateProperties(data, {dimensions: {height: ref.style.height, width: ref.style.width }, position: position});
            }}
            onDragStop={(e, position) => {
                updateProperties(data, {position: {x: position.x, y: position.y}});
            }}
        >
            <img height={height} width={width} draggable={false} src={`data:image/png;base64,${data}`} />
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