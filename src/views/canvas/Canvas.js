import React from 'react';
import { connect } from 'react-redux';
import keys from "lodash/keys";
import { SketchField, Tools } from 'react-sketch';
import CanvasToolbar from "./CanvasToolbar";
import ModifiableImage from "../../components/ModifiableImage";
import "./canvas.css";

const Canvas = props => {
    const { pictures } = props;
    let canvasProps = { tool: Tools.Pencil, lineColor: 'black', lineWidth: 3 };
    const [canvasHeight, setCanvasHeight] = React.useState(null);
    const canvasDivRef = React.useRef();

    if (canvasHeight) {
        canvasProps = { ...canvasProps, height: canvasHeight };
    }

    //TODO: listen for resize
    React.useEffect(() => {
        setCanvasHeight(canvasDivRef.current.offsetHeight);
    }, []);

    return (
        <>
            <CanvasToolbar />
            {keys(pictures).map(key => (
                <div key={key}>
                    <ModifiableImage data={pictures[key].data} hash={key} />
                </div>
            ))}
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