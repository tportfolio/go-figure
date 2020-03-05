import React from 'react';
import './App.css';
import path from 'path';
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
  }
  
    componentDidMount() {
        // Call our fetch function below once the component mounts
      this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    };

      // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
      const response = await fetch(path.join(__dirname, '/express_backend'));
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };

  //   const onChangeHandler=event=>{
	// const images = require.context('../../public/images', true);

  //     for (const file of event.target.files) {
  //       console.log(file);
    
	//   }   
	//   setImg(event.target.files[0]);
  //   }
    
render() {
      return (
          <ThemeProvider theme={theme}>
              <div className="App">
                  <Sidebar />
                  <p>
                      Some boilerplate to verify Electron is running with live server.
                  </p>
                  <p>{this.state.data}</p>
                  <input directory="" webkitdirectory="" type="file" onChange={() => console.log('hello')}/>
              </div>
          </ThemeProvider>
      );
    }
}

export default App;
