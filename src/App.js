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


class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
		data: null
	};
	
	window.api.receive("fromMain", (data) => {
		console.log(`Received ${data} from main process`);
		this.setState({data: <img src={`data:image/png;base64,${data}`}/>})
	});

	}
 
    onChangeHandler = event => {
		const {files} = event.target;
		window.api.send("toMain", files[0].path);
    }
    
render() {
      return (
          <ThemeProvider theme={theme}>
              <div className="App">
                  <Sidebar />
                  <p>
                      Some boilerplate to verify Electron is running with live server.
                  </p>
                  <p>{this.state.data}</p>
                  <input directory="" webkitdirectory="" type="file" onChange={this.onChangeHandler}/>
              </div>
          </ThemeProvider>
      );
    }
}

export default App;
