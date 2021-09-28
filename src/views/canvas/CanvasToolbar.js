import React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { withTheme } from '@mui/styles';

import { channels } from "../../channels";

const onChangeHandler = event => {
    console.log('onchange handler called');
    const { files } = event.target; // this is a FileList; convert to array for ease
    if (files.length > 0) {
        const fileArray = Array.from(files).map(f => f.path);
        console.log(fileArray);
        window.api.send(channels.SENDER_CHANNEL, fileArray);
    }
}

const buttons = [
    {
        icon: AddIcon,
        text: "Add files to layout...",
        additionalContent: (
            <input
                accept="image/*"
                style={{ display: 'none' }}
                multiple
                type="file"
                onChange={onChangeHandler}
            />
        )
    },
    // TODO: future work
    // {
    //     icon: GetAppIcon,
    //     text: "Load layout...",
    // },
    // {
    //     icon: SaveIcon,
    //     text: "Save current layout",
    // },
    // {
    //     icon: SettingsApplicationsSharpIcon,
    //     text: "Layout settings",
    // },
    {
        icon: ClearSharpIcon,
        text: "Clear layout...",
        color: "red"
    }
];

const CanvasToolbar = props => {
    const { theme } = props;

    return (
        <>
            <div id="toolbar">
                {buttons.map(({ icon: Icon, text, additionalContent, color }) => (
                    <Button key={text} variant="contained" component="label" style={{ margin: "5px" }} className="canvas-button">
                        <Icon fontSize="small" style={{ margin: "5px", color: color ?? "white" }} />
                        <Typography style={{ color: color ?? "white" }}>
                            {text}
                        </Typography>
                        {additionalContent}
                    </Button>
                ))}
            </div>
        </>
    )
};

export default withTheme(CanvasToolbar);