import React from 'react';
import { Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { withTheme } from '@mui/styles';

import { SENDER_CHANNEL } from "../../constants";

const onChangeHandler = event => {
    console.log('onchange handler called');
    const { files } = event.target; // this is a FileList; convert to array for ease
    if (files.length > 0) {
        const fileArray = Array.from(files).map(f => f.path);
        console.log(fileArray);
        window.api.send(SENDER_CHANNEL, fileArray);
    }
}

const CanvasToolbar = props => {
    const { theme } = props;
    const inputFileRef = React.useRef(null);

    return (
        <div>
            <input type='file' id='file' multiple ref={inputFileRef} style={{ display: 'none' }} onChange={onChangeHandler} />
            <Toolbar style={{ background: theme.palette.secondary.light, zIndex: 10 }} >
                <Grid container justifyContent="center" alignItems="center">
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
        </div>
    )
};

export default withTheme(CanvasToolbar);