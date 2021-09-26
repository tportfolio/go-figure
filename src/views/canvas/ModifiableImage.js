import React from 'react';
import { connect } from 'react-redux';
import classNames from "classnames";
import { Resizable } from "re-resizable";

import { updatePictureState, togglePictureSelection } from "../../store/ImageCacheReducer";

class ModifiableImage extends React.Component {
    constructor(props) {
        super(props);

        // parent data
        const { blob, hash } = props.metadata;

        // initial image loading getting/setting
        this.ref = React.createRef();
        this.hash = hash;
        this.blob = blob;

        // prop setup
        this.imgProps = { ref: this.ref, src: blob, draggable: false, onLoad: e => this.onLoad(e.target) };
        this.resizeEnableProps = { bottomRight: true, bottomLeft: true, topRight: true, topLeft: true };

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
        let [rotation, picturePosition] = [{}, {}];
        if (e.shiftKey && this.state.isRotateActive) {
            const radians = Math.atan2(pageX - this.state.boxCenter.x, pageY - this.state.boxCenter.y);
            const degree = (radians * (180 / Math.PI) * -1) + 90;
            rotation = { rotation: degree };
            this.setState({ isRotateActive: false });
        } else if (which === 1 && this.state.isDragActive) {
            const cachedPosition = this.getPosition();
            const newX = pageX - this.state.cursorPosition.x + cachedPosition.x;
            const newY = pageY - this.state.cursorPosition.y + cachedPosition.y;
            picturePosition = { position: { x: newX, y: newY } };
            this.setState({ isDragActive: false });
        } else {
            return;
        }

        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('mouseup', this.mouseUpHandler);

        const { width, height } = this.ref.current.getBoundingClientRect();
        const propertyObject = { height: height, width: width, ...picturePosition, ...rotation };
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
            const offsetX = pageX - this.state.cursorPosition.x;
            const offsetY = pageY - this.state.cursorPosition.y;
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

    getPosition = () => {
        const { position } = this.props.cachedProperties;
        return position ? position : { x: 0, y: 0 };
    }

    getRotate = () => {
        const { rotation } = this.props.cachedProperties;
        return rotation ? rotation : 0;
    };

    getTransformString = ({ rotate = this.getRotate(), translate = { x: 0, y: 0 } }) => {
        return `${this.getMirrorStyle()} translate(${translate.x}px, ${translate.y}px) rotate(${rotate}deg)`;
    };

    // TODO: adjust x/y based on anchor point
    onResize = (e, direction, ref, delta) => {
        this.props.updateProperties(this.hash, { dimensions: { height: ref.clientHeight, width: ref.clientWidth } });
    };

    render() {
        const { isSelected } = this.props;
        const resizableClassName = classNames("modifiable-image", { selected: isSelected, dragging: this.state.isDragActive });
        const imageClassName = classNames({ selected: isSelected });

        const { height, width } = this.getDimensions();
        const { x, y } = this.getPosition();
        let extendedImgProps = this.imgProps;
        
        // if we've loaded the image, these can be added
        if (height && width) {
            const style = { opacity: this.getOpacity(), height, width };
            extendedImgProps = { ...extendedImgProps, style };
        }

        return (
            <Resizable
                className={resizableClassName}
                size={{ width, height }}
                onResize={this.onResize}
                enable={this.resizeEnableProps}
                lockAspectRatio
                style={{ left: x, top: y, position: "absolute" }}
            >
                <img
                    {...extendedImgProps}
                    className={imageClassName}
                    alt=""
                    onMouseDown={this.mouseDownHandler}
                />
            </Resizable>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const cachedProperties = state.imagecache.pictureProperties[ownProps.metadata.hash];
    return {
        cachedProperties: cachedProperties ? cachedProperties : {},
        isSelected: state.imagecache.selectedPictures.includes(ownProps.metadata.hash)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateProperties: (hash, properties) => dispatch(updatePictureState(hash, properties)),
        togglePictureSelection: (hash, isCtrlKeyPressed) => dispatch(togglePictureSelection(hash, isCtrlKeyPressed)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifiableImage);