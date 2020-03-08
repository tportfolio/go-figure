import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { blue, indigo, blueGrey } from '@material-ui/core/colors';
import { Switch, Route, HashRouter } from 'react-router-dom';
import App from './App';
import Canvas from "./views/Canvas";
import FigureDrawing from "./views/FigureDrawing";
import StatsOverview from "./views/StatsOverview";
import Settings from "./views/Settings";
import About from "./views/About";
import Sidebar from "./sidebar/Sidebar";

export const routing = (
    <HashRouter>
        <Sidebar />
        <Switch>
            <Route path="/canvas" component={Canvas} />
            <Route path="/figuredrawing" component={FigureDrawing} />
            <Route path="/statsoverview" component={StatsOverview} />
            <Route path="/settings" component={Settings} />
            <Route path="/about" component={About} />
            <Route path="/" exact component={App} />
        </Switch>
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