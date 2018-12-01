import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';
import { MuiThemeProvider } from '@material-ui/core/styles'
import { createStore } from "redux"
const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: grey
  }
})

ReactDOM.render(<MuiThemeProvider theme={theme}>
  <App/> </MuiThemeProvider>
  , document.querySelector("#root"));
