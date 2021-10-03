import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StyledEngineProvider } from '@mui/material/styles';
import * as logger from 'loglevel';

import rootReducer from './store/reducer';
import ElectronListener from './store/ElectronListener';
import Router from './views/routing';
import CustomThemeProvider from './components/CustomThemeProvider';

import './index.css';

const store = createStore(rootReducer);

// set log level based on development or production mode
logger.setLevel(!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? logger.levels.DEBUG : logger.levels.INFO);

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
