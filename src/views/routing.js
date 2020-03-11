import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import Canvas from "./canvas/Canvas";
import FigureDrawing from "./FigureDrawing";
import StatsOverview from "./StatsOverview";
import Settings from "./Settings";
import About from "./About";
import App from "../App";

const routing = sidebar => {
    const Sidebar = sidebar;
    return (
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
}

export default routing;