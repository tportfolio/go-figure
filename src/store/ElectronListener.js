import { addPicture } from "./ImageCacheReducer";
import { connect } from 'react-redux';

// kludge to separate out async return from the canvas itself
const ElectronListener = props => {
    window.api.receive("fromMain", (data) => {
        console.log(`Received ${data} from main process`);
        props.addPicture(data);
    });   

    return null;
}

const mapDispatchToProps = dispatch => {
    return {
        addPicture: picture => dispatch(addPicture(picture))
    }
};   

export default connect(null, mapDispatchToProps)(ElectronListener);
