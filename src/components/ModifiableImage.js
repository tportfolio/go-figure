import React from 'react';
import { connect } from 'react-redux';
import { base64StringToBlob } from 'blob-util';
import classNames from "classnames";

import { updatePictureState, togglePictureSelection } from "../store/ImageCacheReducer";
import "./image.css";

class ModifiableImage extends React.Component {
    constructor(props) {
        super(props);

        // parent data
        const { data, hash } = props;

        // initial image loading getting/setting
        this.ref = React.createRef();
        this.hash = hash;
        this.blob = URL.createObjectURL(base64StringToBlob(data, "image/png"));

        // prop setup
        this.imgProps = { alt: "", ref: this.ref, src: this.blob, draggable: false, onLoad: e => this.onLoad(e.target) };

        this.state = {
            isDragActive: false,
            isRotateActive: false,
            boxCenter: null,
            cursorPosition: null
        };
    }

    componentDidUpdate = () => {
        if (this.ref.current) {
            this.ref.current.style.transform = this.getTransformString({});
        }
    }

    onLoad = target => this.props.updateProperties(this.hash, { dimensions: { height: target.height, width: target.width } });

    // TODO: correctly determine direction of rotation/mirroring when translation has occurred
    // TODO: correctly determine direction of translation when rotation/mirroring has occurred
    mouseDownHandler = e => {
        const { left, top, width, height } = this.ref.current.getBoundingClientRect();
        const { pageX, pageY } = e;

        console.log(`left is ${left}, top is ${top}, width is ${width}, height is ${height}`);
        console.log(`mouse x is ${pageX}, mouse y is ${pageY}`);

        if (e.shiftKey) {
            const boxCenterX = left + width / 2;
            const boxCenterY = top + height / 2;
            this.setState({ isRotateActive: true, boxCenter: { x: boxCenterX, y: boxCenterY } });
        } else {
            this.setState({ isDragActive: true, cursorPosition: { x: pageX, y: pageY } });
        }

        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUpHandler);

        this.props.togglePictureSelection(this.hash, e.ctrlKey);
    };

    mouseUpHandler = e => {
        const { pageX, pageY, which } = e;

        // TODO: consider initial mouse down position and use that as starting point for rotation increment to avoid jumping
        let [rotation, offset] = [{}, {}];
        if (e.shiftKey && this.state.isRotateActive) {
            const radians = Math.atan2(pageX - this.state.boxCenter.x, pageY - this.state.boxCenter.y);
            const degree = (radians * (180 / Math.PI) * -1) + 90;
            rotation = { rotation: degree };
            this.setState({ isRotateActive: false });
        } else if (which === 1 && this.state.isDragActive) {
            const cachedOffset = this.getTranslateObject();
            const offsetX = pageX - this.state.cursorPosition.x + cachedOffset.x;
            const offsetY = pageY - this.state.cursorPosition.y + cachedOffset.y;
            offset = { offset: { x: offsetX, y: offsetY } };
            this.setState({ isDragActive: false });
        } else {
            return;
        }

        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('mouseup', this.mouseUpHandler);

        const { width, height } = this.ref.current.getBoundingClientRect();
        const propertyObject = { height: height, width: width, ...offset, ...rotation };
        this.props.updateProperties(this.hash, propertyObject);
    };

    mouseMove = e => {
        const { pageX, pageY, which } = e;

        // TODO: add resizing with aspect ratio locked
        if (e.shiftKey && this.state.isRotateActive && this.state.boxCenter) {
            const radians = Math.atan2(pageX - this.state.boxCenter.x, pageY - this.state.boxCenter.y);
            const degree = (radians * (180 / Math.PI) * -1) + 90;
            this.ref.current.style.transform = this.getTransformString({ rotate: degree });
        } else if (which === 1 && this.state.isDragActive && this.state.cursorPosition) {
            const cachedOffset = this.getTranslateObject();
            const offsetX = pageX - this.state.cursorPosition.x + cachedOffset.x;
            const offsetY = pageY - this.state.cursorPosition.y + cachedOffset.y;
            this.ref.current.style.transform = this.getTransformString({ translate: { x: offsetX, y: offsetY } });
        }
    }

    getDimensions = () => {
        const { dimensions } = this.props.cachedProperties;
        return dimensions ? dimensions : { height: 0, width: 0 };
    }

    getMirrorStyle = () => {
        const { mirrorH, mirrorV } = this.props.cachedProperties;
        return mirrorH && mirrorV ? "scale(-1, -1)" : mirrorH ? "scale(-1, 1)" : mirrorV ? "scale(1, -1)" : "";
    }

    getOpacity = () => {
        const { opacity } = this.props.cachedProperties;
        return opacity ? opacity : 1;
    }

    getTranslateObject = () => {
        const { offset } = this.props.cachedProperties;
        return offset ? offset : { x: 0, y: 0 };
    }

    getRotate = () => {
        const { rotation } = this.props.cachedProperties;
        return rotation ? rotation : 0;
    };

    getTransformString = ({ rotate = this.getRotate(), translate = this.getTranslateObject() }) => {
        return `${this.getMirrorStyle()} translate(${translate.x}px, ${translate.y}px) rotate(${rotate}deg)`;
    };

    render() {
        const { isSelected } = this.props;
        const className = classNames("modifiable-image", { selected: isSelected, dragging: this.state.isDragActive });

        const styleProp = { position: "absolute", opacity: this.getOpacity() };
        let extendedImgProps = { ...this.imgProps, style: styleProp };

        // if we've loaded the image, these can be added
        const { height, width } = this.getDimensions();
        if (height && width) {
            extendedImgProps = { ...extendedImgProps, height: height, width: width, className: className };
        }

        return (
            <div key={this.hash} draggable={false}>
                <img {...extendedImgProps} onMouseDown={this.mouseDownHandler} />
            </div>
        );
    }
}

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