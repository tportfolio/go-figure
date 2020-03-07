import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { GlobalHotKeys } from "react-hotkeys";
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { managePictures } from "./store/reducer";
import ElectronListener from "./store/reducer";
import { keyMap, theme, routing } from "./constants";

import { ThemeProvider } from '@material-ui/core/styles';
const store = createStore(managePictures);

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <GlobalHotKeys keyMap={keyMap}>
                {routing}
                <ElectronListener/>
            </GlobalHotKeys>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
