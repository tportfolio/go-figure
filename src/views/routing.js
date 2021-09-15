import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

import Canvas from "./canvas/Canvas";
import FigureDrawing from "./FigureDrawing";
import StatsOverview from "./StatsOverview";
import Settings from "./Settings";
import About from "./About";
import App from "../App";
import Sidebar from "../sidebar/Sidebar";
import "./views.css";

const styling = cached => cached ? { style: { display: "none" }} : { className: "view-container" };

const routes = [
    {
        path: "/canvas",
        component: Canvas
    },
    {
        path: "/figuredrawing",
        component: FigureDrawing
    },
    {
        path: "/statsoverview",
        component: StatsOverview
    },
    {
        path: "/settings",
        component: Settings
    },
    {
        path: "/about",
        component: About
    },
    
]

const Router = () => {
    return (
        <HashRouter>
            <Sidebar />
            <CacheSwitch>
                {routes.map(({ path, component: Component }) => <CacheRoute path={path} component={Component} behavior={styling} />)}
                <Route path="/" exact component={App} />
            </CacheSwitch>
        </HashRouter>
    );
}

export default Router;