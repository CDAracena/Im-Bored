import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';
import { MuiThemeProvider } from '@material-ui/core/styles'
import { createStore } from "redux"
import {Provider} from 'react-redux';
import store from './store'


const theme = createMuiTheme({
  palette: {
    primary: {
      light: orange[200],
      main: '#FF9800',
      dark: orange[800]
    },
    secondary: {
      light:'#E0E0E0',
      main: '#9E9E9E',
      dark: '#424242'

    }
  }
})

ReactDOM.render(<MuiThemeProvider theme={theme}>
  <Provider store={store}><App/></Provider></MuiThemeProvider>
  , document.querySelector("#root"));
