import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

import Canvas from "./canvas/Canvas";
import FigureDrawing from "./FigureDrawing";
import StatsOverview from "./StatsOverview";
import Settings from "./Settings";
import About from "./About";
import App from "../App";
import "./views.css";

const styling = cached => cached ? { style: { display: "none" }} : { id: "cached-view" };

const routing = sidebar => {
    const Sidebar = sidebar;
    return (
        <HashRouter>
            <Sidebar />
            <CacheSwitch>
                <CacheRoute path="/canvas" component={Canvas} behavior={styling} />
                <Route path="/figuredrawing" component={FigureDrawing} />
                <Route path="/statsoverview" component={StatsOverview} />
                <Route path="/settings" component={Settings} />
                <Route path="/about" component={About} />
                <Route path="/" exact component={App} />
            </CacheSwitch>
        </HashRouter>
    );
}

export default routing;