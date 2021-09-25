import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

import Canvas from "./canvas/Canvas";
import FigureDrawing from "./figuredrawing/FigureDrawing";
import StatsOverview from "./stats/StatsOverview";
import Settings from "./settings/Settings";
import About from "./about/About";
import App from "../App";
import Sidebar from "../components/Sidebar";
import "./views.css";

const styling = cached => cached ? { style: { display: "none" }} : { className: "cached-view-container" };

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
                {routes.map(({ path, component: Component }) => <CacheRoute key={path} path={path} component={Component} behavior={styling} />)}
                <Route path="/" exact component={App} />
            </CacheSwitch>
        </HashRouter>
    );
}

export default Router;