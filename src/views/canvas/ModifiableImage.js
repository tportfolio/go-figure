import React from 'react';
import { connect } from 'react-redux';
import classNames from "classnames";
import { Resizable } from "re-resizable";
import * as logger from 'loglevel';

import { updatePictureState, togglePictureSelection } from '../../store/ImageCacheReducer';

/**
 * Wrapper component for an image on the reference canvas.
 */
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
        // sets corners that are available to use for resizing image (omits sides, i.e., top, bottom...)
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

    /**
     * Sets image dimensions on load.
     * @param {*} target - image ref
     * @returns None
     */
    onLoad = target => this.props.updateProperties(this.hash, { dimensions: { height: target.height, width: target.width } });

    /**
     * On mouse down, sets box center for rotation, cursor position for drag.
     * TODO: determine direction of rotation/mirroring when translation has occurred
     * TODO: determine direction of translation when rotation/mirroring has occurred
     * @param {*} e - mouse event 
     */
    mouseDownHandler = e => {
        const { left, top, width, height } = this.ref.current.getBoundingClientRect();
        const { pageX, pageY, shiftKey, ctrlKey } = e;

        logger.trace(`mouseDownHandler: left is ${left}, top is ${top}, width is ${width}, height is ${height}`);
        logger.trace(`mouseDownHandler: mouse x is ${pageX}, mouse y is ${pageY}`);

        if (shiftKey) {
            // rotation case
            const boxCenterX = left + width / 2;
            const boxCenterY = top + height / 2;
            this.setState({ isRotateActive: true, boxCenter: { x: boxCenterX, y: boxCenterY } });
        } else {
            // translate case
            this.setState({ isDragActive: true, cursorPosition: { x: pageX, y: pageY } });
        }

        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUpHandler);

        this.props.togglePictureSelection(this.hash, ctrlKey);
    };

    /**
     * Update state after mouse button is released.
     * TODO: consider initial mouse down position and use that as starting point for rotation increment to avoid jumping
     * @param {*} e - mouse event
     * @returns None
     */
    mouseUpHandler = e => {
        const { pageX, pageY, which, shiftKey } = e;

        let [rotation, picturePosition] = [{}, {}];
        if (shiftKey && this.state.isRotateActive) {
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

    /**
     * Update transform string while mouse is moving to avoid repeatedly setting state.
     * @param {*} e - mouse event
     */
    mouseMove = e => {
        const { pageX, pageY, which, shiftKey } = e;

        if (shiftKey && this.state.isRotateActive) {
            const radians = Math.atan2(pageX - this.state.boxCenter.x, pageY - this.state.boxCenter.y);
            const degree = (radians * (180 / Math.PI) * -1) + 90;
            this.ref.current.style.transform = this.getTransformString({ rotate: degree });
        } else if (which === 1 && this.state.isDragActive) {
            const offsetX = pageX - this.state.cursorPosition.x;
            const offsetY = pageY - this.state.cursorPosition.y;
            this.ref.current.style.transform = this.getTransformString({ translate: { x: offsetX, y: offsetY } });
        }
    }

    /**
     * Get dimensions of image.
     * @returns dimensions
     */
    getDimensions = () => {
        const { dimensions } = this.props.cachedProperties;
        return dimensions ?? { height: 0, width: 0 };
    }

    /**
     * Get mirror string.
     * @returns mirror string
     */
    getMirrorStyle = () => {
        const { mirrorH, mirrorV } = this.props.cachedProperties;
        const hVal = mirrorH ? -1 : 1;
        const vVal = mirrorV ? -1 : 1;
        return `scale(${hVal}, ${vVal})`;
    }

    /**
     * Get opacity
     * @returns opacity
     */
    getOpacity = () => {
        const { opacity } = this.props.cachedProperties;
        return opacity ?? 1;
    }

    /**
     * Get image position on canvas.
     * @returns image position
     */
    getPosition = () => {
        const { position } = this.props.cachedProperties;
        return position ?? { x: 0, y: 0 };
    }

    /**
     * Get image rotation.
     * @returns rotation
     */
    getRotate = () => {
        const { rotation } = this.props.cachedProperties;
        return rotation ?? 0;
    };

    /**
     * Get transform string.
     * @param {*} (rotation and translation)
     * @returns translate string
     */
    getTransformString = ({ rotate = this.getRotate(), translate = { x: 0, y: 0 } }) => {
        return `${this.getMirrorStyle()} translate(${translate.x}px, ${translate.y}px) rotate(${rotate}deg)`;
    };

    /**
     * Update image dimensions on resize.
     * TODO: adjust x/y based on anchor
     * @param {*} e - mouse event
     * @param {*} direction - direction of resize
     * @param {*} ref - image reference
     * @param {*} delta - pixel change
     */
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