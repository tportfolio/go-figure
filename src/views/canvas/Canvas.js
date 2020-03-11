import React from 'react';
import { connect } from 'react-redux';
import ModifiableImage from '../../components/ModifiableImage';

import keys from "lodash/keys";
import { SketchField, Tools } from 'react-sketch';
import CanvasToolbar from "./CanvasToolbar";
import "./canvas.css";

const hashCode = s => s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0);

const Canvas = props => {
    const { pictures } = props;
    let canvasProps = { tool: Tools.Pencil, lineColor: 'black', lineWidth: 3};
    const [canvasHeight, setCanvasHeight] = React.useState(null);
    const canvasDivRef = React.useRef();

    if (canvasHeight) {
        canvasProps = {...canvasProps, height: canvasHeight};
    }

    //TODO: listen for resize
    React.useEffect(() => {
        setCanvasHeight(canvasDivRef.current.offsetHeight);
    }, []);

    return (
        <>
            <CanvasToolbar />
            <div>
                {keys(pictures).map(p => <ModifiableImage key={hashCode(p)} data={p} />)}
            </div>
            <div id="canvas-div" ref={canvasDivRef}>
                <SketchField {...canvasProps} />
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        pictures: state.imagecache.pictures
    }
}

// canvas only cares when the number of pictures changes on the screen; the pictures themselves are self-managing
const isEqual = (prevProps, nextProps) => keys(prevProps.pictures).length === keys(nextProps.pictures).length;

export default connect(mapStateToProps)(React.memo(Canvas, isEqual));