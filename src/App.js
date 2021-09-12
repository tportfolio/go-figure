import React from 'react';
import { Fade } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import BrushIcon from '@material-ui/icons/Brush';
import './App.css';

const TITLE_TRANSITION_DURATION_MSECS = 3000;

const App = () => {
    return (
        <Grid container direction="column">
            <Fade in={true} timeout={TITLE_TRANSITION_DURATION_MSECS}>      
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>                  
                        <p className="splash-screen-title">
                            go figure
                        </p>
                        </Grid>  
                        <Grid item>
                        <BrushIcon className="paint-brush-icon" style={{color: "white", fontSize: "96px"}}/>
                    </Grid>    
                </Grid>
            </Fade>
            <Grid container direction="row" justify="center">
                <Grid item>
                    <Fade in={true} style={{ transitionDelay: TITLE_TRANSITION_DURATION_MSECS + 'ms'}} timeout={TITLE_TRANSITION_DURATION_MSECS}>
                        <p className="left-arrow-hint">
                            (press left/right arrow keys to toggle menu)
                        </p>
                    </Fade>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;
