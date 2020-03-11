import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { GlobalHotKeys } from "react-hotkeys";
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from "./store/reducer";
import ElectronListener from "./store/ElectronListener";
import { keyMap, theme } from "./constants";
import routing from "./views/routing";
import Sidebar from "./sidebar/Sidebar";

import { ThemeProvider } from '@material-ui/core/styles';
const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <GlobalHotKeys keyMap={keyMap}>
                {routing(Sidebar)}
                <ElectronListener/>
            </GlobalHotKeys>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
