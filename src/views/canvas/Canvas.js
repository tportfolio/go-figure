import React from 'react';
import { connect } from 'react-redux';
import keys from "lodash/keys";
import { SketchField, Tools } from 'react-sketch';
import { HotKeys } from "react-hotkeys";
import range from "lodash/range";

import CanvasToolbar from "./CanvasToolbar";
import ModifiableImage from "../../components/ModifiableImage";
import { transparencyKeys } from "../../constants";
import "./canvas.css";

const keyMap = Object.assign({}, ...range(1, 10).map(n => ({[transparencyKeys[n-1]]: n.toString()})));

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
        <HotKeys keyMap={keyMap} id={"hotkey-canvas-wrapper"}>
            <CanvasToolbar />
            {keys(pictures).map(key => (
                <div key={key}>
                    <ModifiableImage data={pictures[key].data} hash={key} />
                </div>
            ))}
            <div id="canvas-div" ref={canvasDivRef}>
                <SketchField {...canvasProps} />
            </div>
        </HotKeys>
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