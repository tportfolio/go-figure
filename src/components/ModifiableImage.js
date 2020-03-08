import React from 'react';
import { connect } from 'react-redux';
import { Rnd } from 'react-rnd';
import { updatePictureState } from "../store/reducer";

const ModifiableImage = props => {
    const targetRef = React.useRef();
    const {data, cachedDimensions, saveDimensionsToStore} = props;
    const [dimensions, setDimensions] = React.useState(cachedDimensions);

    React.useEffect(() => {
        console.log(dimensions);
        if ((dimensions.height === 0 || dimensions.width === 0) && targetRef.current) {
            const newDimensions = {height: targetRef.current.offsetHeight, width: targetRef.current.offsetWidth};
            saveDimensionsToStore({data: data, dimensions: newDimensions});
            setDimensions(newDimensions);
        }
    }, [data, cachedDimensions, saveDimensionsToStore]);

    const {height, width} = dimensions;

    return (
        <Rnd ref={targetRef} style={{ zIndex: 9 }} lockAspectRatio={true}
            onResize={(e, direction, ref, delta, position) => {
                setDimensions({ height: ref.style.height, width: ref.style.width });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                saveDimensionsToStore({ data: data, dimensions: {height: ref.style.height, width: ref.style.width }});
            }}
        >
            <img  height={height} width={width} draggable={false} src={`data:image/png;base64,${data}`} />
        </Rnd>
    );
};

const mapStateToProps = (state, ownProps) => {
    const cachedDimensions = state.pictureProperties[ownProps.data];     
    return {
        cachedDimensions: cachedDimensions ? cachedDimensions : {height: 0, width: 0}
    }
};

const mapDispatchToProps = dispatch => {
    return {
        saveDimensionsToStore: (data, dimensions) => dispatch(updatePictureState(data, dimensions))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifiableImage);