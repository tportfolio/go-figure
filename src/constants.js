import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { blue, indigo } from '@material-ui/core/colors';
import { Switch, Route, HashRouter } from 'react-router-dom';
import App from './App';
import Canvas from "./views/Canvas";
import FigureDrawing from "./views/FigureDrawing";
import Sidebar from "./sidebar/Sidebar";

export const routing = (
    <HashRouter>
        <div>
            <Sidebar />
            <Switch>
                <Route path="/canvas" component={Canvas} />
                <Route path="/figuredrawing" component={FigureDrawing} />
                <Route path="/" exact component={App} />
            </Switch>
        </div>
    </HashRouter>
);

export const keyMap = {
    TOGGLE_SIDEBAR_ON: "right",
    TOGGLE_SIDEBAR_OFF: "left"
};

export const theme = createMuiTheme({
	palette: {
		primary: { light: blue[300], main: "#141e3d", dark: blue[700] },
		secondary: { light: indigo[50], main:  indigo[500], dark:  indigo[700] },
	},
	typography: {
		fontFamily: [
			'Nunito',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif'
		].join(','),
	}
});