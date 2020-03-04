import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GlobalHotKeys } from "react-hotkeys";
import * as serviceWorker from './serviceWorker';

const keyMap = {
    TOGGLE_SIDEBAR_ON: "right",
    TOGGLE_SIDEBAR_OFF: "left"
};  

ReactDOM.render(
    (
        <GlobalHotKeys keyMap={keyMap}>
            <App />
        </GlobalHotKeys>
    ), 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
