import React from 'react';
import { Rnd } from 'react-rnd';

const ModifiableImage = props => {
    const targetRef = React.useRef();

    const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 });

    React.useEffect(() => {
        if (targetRef.current) {
            console.log("ref is current");
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, []);

    console.log(`my height is ${dimensions.height}`);
    return (
        <Rnd ref={targetRef}
            onResize={(e, direction, ref, delta, position) => {
                setDimensions({ height: ref.style.height, width: ref.style.width });
            }}
        >
            <img height={dimensions.height} width={dimensions.width}
                draggable={false} src={`data:image/png;base64,${props.data}`}
            />
        </Rnd>
    );
};

export default React.memo(ModifiableImage);