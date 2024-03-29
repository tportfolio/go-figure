import React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

import { channels } from "../../channels";
import { requestImages } from '../../utils/utils';

/**
 * Buttons available on the canvas toolbar.
 */
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
                onChange={requestImages(channels.CANVAS_REQUEST_FILES)}
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
        color: "#ff2424"
    }
];

/**
 * Toolbar that resides at the bottom of the canvas.
 * @param {*} props 
 * @returns 
 */
const CanvasToolbar = props => {
    return (
        <>
            <div id="canvas-toolbar">
                {buttons.map(({ icon: Icon, text, additionalContent, color }) => (
                    <Button
                        className="canvas-button"
                        key={text}
                        variant="contained"
                        component="label"
                        style={{ margin: "5px" }}
                    >
                        <Icon
                            fontSize="small"
                            style={{
                                margin: "5px",
                                color: color ?? "white"
                            }}
                        />
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

export default CanvasToolbar;