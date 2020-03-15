import React from 'react';
import { connect } from 'react-redux';
import { base64StringToBlob } from 'blob-util';
import classNames from "classnames";

import { updatePictureState, togglePictureSelection } from "../store/ImageCacheReducer";
import "./image.css";

const ModifiableImage = props => {
    // redux setters:
    const { updateProperties, togglePictureSelection } = props;

    // redux/parent data:
    const { data, hash, cachedProperties, isSelected } = props;

    console.log(`${hash} is reloading`);

    // initial image loading getting/setting
    const ref = React.useRef();
    const onLoad = target => setDimensions({ height: target.height, width: target.width });
    const blob = React.useMemo(() => URL.createObjectURL(base64StringToBlob(data, "image/png")), [data]);

    // prop setup
    let imgProps = React.useMemo(() => ({ ref: ref, src: blob, draggable: false, onLoad: e => onLoad(e.target) }), [blob]);

    // dynamic image dimension setting via react-rnd
    const { dimensions: cachedDimensions } = cachedProperties;
    const [dimensions, setDimensions] = React.useState(cachedDimensions ? cachedDimensions : { height: 0, width: 0 });

    // other modifiable image props
    const cachedOffset = cachedProperties.offset ? cachedProperties.offset : { x: 0, y: 0 };
    const opacity = cachedProperties.opacity ? cachedProperties.opacity : 1;
    const { mirrorH, mirrorV } = cachedProperties;

    const mirrorStyle = mirrorH && mirrorV ? "scale(-1, -1)" : mirrorH ? "scale(-1, 1)" : mirrorV ? "scale(1, -1)" : "";
    const cachedRotation = cachedProperties.rotation ? cachedProperties.rotation : 0;
    const className = classNames("modifiable-image", { selected: isSelected });

    const styleProp = {position: "absolute", opacity: opacity};
    imgProps = {...imgProps, style: styleProp};

    // if we've loaded the image, these can be added
    const { height, width } = dimensions;
    if (height && width) {
        imgProps = { ...imgProps, height: height, width: width, className: className };
    }

    const [isShiftActive, setIsShiftActive] = React.useState(false);
    const [boxCenter, setBoxCenter] = React.useState(null);
    const [cursorPosition, setCursorPosition] = React.useState(null);

    const mouseDownHandler = e => {
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const { pageX, pageY } = e;

        console.log(`left is ${left}, top is ${top}, width is ${width}, height is ${height}`);
        console.log(`mouse x is ${pageX}, mouse y is ${pageY}`);

        if (e.shiftKey) {
            const boxCenterX = left + width / 2;
            const boxCenterY = top + height / 2;

            setBoxCenter({ x: boxCenterX, y: boxCenterY });
            setIsShiftActive(true);
        } else {
            setCursorPosition({ x: pageX, y: pageY });
        }

        togglePictureSelection(hash, e.ctrlKey);
    };

    const mouseUpHandler = e => {
        const { pageX, pageY } = e;

        let [rotation, offset] = [{}, {}];
        if (isShiftActive) {
            setIsShiftActive(false);
            const radians = Math.atan2(pageX - boxCenter.x, pageY - boxCenter.y);
            const degree = (radians * (180 / Math.PI) * -1) + 90;
            rotation = { rotation: degree };
        } else {
            const offsetX = pageX - cursorPosition.x + cachedOffset.x;
            const offsetY = pageY - cursorPosition.y + cachedOffset.y;
            offset = { offset: { x: offsetX, y: offsetY } };
        }

        const { width, height } = ref.current.getBoundingClientRect();
        const propertyObject = { height: height, width: width, ...offset, ...rotation };
        updateProperties(hash, propertyObject);
    };

    const mouseMove = e => {
        const { pageX, pageY } = e;
        // TODO: add resizing with aspect ratio locked

        if (isShiftActive) {
            const radians = Math.atan2(pageX - boxCenter.x, pageY - boxCenter.y);
            const degree = (radians * (180 / Math.PI) * -1) + 90;
            ref.current.style.transform = getTransformString({rotate: degree});
            // console.log(degree);
        } else if (e.buttons === 1) {
            const offsetX = pageX - cursorPosition.x + cachedOffset.x;
            const offsetY = pageY - cursorPosition.y + cachedOffset.y;
            ref.current.style.transform = getTransformString({translate: {x: offsetX, y: offsetY}});
        }
    }

    const getTransformString = ({rotate=cachedRotation, translate=cachedOffset}) => {
        return `${mirrorStyle} translate(${translate.x}px, ${translate.y}px) rotate(${rotate}deg)`;
    };

    if (ref.current) {
        ref.current.style.transform = getTransformString({});
    }

    // debugger;

    return (
        <div key={hash}>
            <img {...imgProps} onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler} onMouseMove={mouseMove} />
        </div>
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