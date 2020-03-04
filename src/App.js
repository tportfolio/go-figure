import React from 'react';
import './App.css';
import Sidebar from "./sidebar/Sidebar";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, indigo } from '@material-ui/core/colors';


const theme = createMuiTheme({
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

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Sidebar />
                <p>
                    Some boilerplate to verify Electron is running with live server.
                </p>
            </div>
        </ThemeProvider>
    );
}

export default App;
