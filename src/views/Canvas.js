import React from 'react';
import { connect } from 'react-redux';
import ModifiableImage from '../components/ModifiableImage';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';
import SettingsApplicationsSharpIcon from '@material-ui/icons/SettingsApplicationsSharp';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';

const onChangeHandler = event => {
    console.log('onchange handler called');
    const { files } = event.target; // this is a FileList; convert to array for ease
    if (files.length > 0) {
        const fileArray = Array.from(files).map(f => f.path);
        console.log(fileArray);
        window.api.send("toMain", fileArray);
    }
}

const hashCode = s => s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0);

const Canvas = props => {
    const { pictures, theme } = props;
    const inputFileRef = React.useRef(null);

    console.log(`size of pictures is ${pictures.length}`);
    return (
        <div>
            <input type='file' id='file' multiple ref={inputFileRef} style={{ display: 'none' }} onChange={onChangeHandler} />
            <Toolbar style={{ background: theme.palette.secondary.light, zIndex: 10}} >
                <Grid container justify="center" alignItems="center">
                    <Button onClick={() => inputFileRef.current.click()}>
                        <AddIcon fontSize="small" style={{ color: theme.palette.primary.dark }} />
                        Add to layout...
                    </Button>
                    <Button>
                        <GetAppIcon fontSize="small" style={{ color: theme.palette.primary.dark }} />
                        Load layout...
                    </Button>
                    <Button>
                        <SaveIcon fontSize="small" style={{ color: theme.palette.primary.dark }} />
                        Save current layout
                    </Button>
                    <Button>
                        <SettingsApplicationsSharpIcon fontSize="small" style={{ color: theme.palette.primary.dark }} />
                        Layout settings
                    </Button>
                    <Divider orientation="vertical" flexItem />
                    <Button style={{ color: "red" }}>
                        <ClearSharpIcon fontSize="small" style={{ color: "red" }} />
                        Clear layout...
                    </Button>
                </Grid>
            </Toolbar>
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

export default connect(mapStateToProps)(withTheme(Canvas));