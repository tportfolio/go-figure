import React from 'react';
import { Fade } from '@mui/material';
import { Grid } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';

import './App.css';

const TITLE_TRANSITION_DURATION_MSECS = 3000;

/**
 * Displays the initial splash screen with the app name and menu hint.
 * @returns Grid representation of the splash screen
 */
const App = () => {
    return (
        <Grid container direction="column" align="center" justifyContent="center">
            <Fade in={true} timeout={TITLE_TRANSITION_DURATION_MSECS}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item>
                        <p id="splash-screen-title">
                            go figure
                        </p>
                    </Grid>
                    <Grid item>
                        <BrushIcon id="paint-brush-icon" style={{ color: "white", fontSize: "96px" }} />
                    </Grid>
                </Grid>
            </Fade>
            <Grid container direction="row" justifyContent="center">
                <Grid item>
                    <Fade in={true} style={{ transitionDelay: TITLE_TRANSITION_DURATION_MSECS + 'ms' }} timeout={TITLE_TRANSITION_DURATION_MSECS}>
                        <p id="start-hint">
                            (hover over left-hand drawer to expand menu)
                        </p>
                    </Fade>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;
