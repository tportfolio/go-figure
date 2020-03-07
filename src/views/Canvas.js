import React from 'react';
import { connect } from 'react-redux';
import ModifiableImage from '../components/ModifiableImage';

const onChangeHandler = event => {
    console.log('onchange handler called');
    const { files } = event.target;
    window.api.send("toMain", files[0].path);
}

const hashCode = s => s.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0);

const Canvas = props => {
    const {pictures} = props;

    console.log(`size of pictures is ${pictures.length}`);
    return (
        <div>
            <h1>canvas</h1>
            <input type="file" onChange={onChangeHandler} />
            <div>
                {pictures.map(p => <ModifiableImage key={hashCode(p)} data={p} />)}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        pictures: state.pictures
    }
}

export default connect(mapStateToProps)(Canvas);