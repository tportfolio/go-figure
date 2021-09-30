import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StyledEngineProvider } from '@mui/material/styles';
import * as log from 'loglevel';

import rootReducer from "./store/reducer";
import ElectronListener from "./store/ElectronListener";
import Router from "./views/routing";
import * as serviceWorker from './serviceWorker';
import CustomThemeProvider from './components/CustomThemeProvider';

import './index.css';

const store = createStore(rootReducer);

log.setLevel(!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? log.levels.DEBUG : log.levels.INFO);

ReactDOM.render(
    <Provider store={store}>
        <StyledEngineProvider injectFirst>
            <CustomThemeProvider >
                <Router />
                <ElectronListener/>
            </CustomThemeProvider>
        </StyledEngineProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
