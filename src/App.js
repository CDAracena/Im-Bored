import React, { Component } from 'react';
import  {withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import {Favorites} from './utils/svg_icons'
import { connect } from 'react-redux';
import RecreationGrid from './components/ReacreationGrid';
import History from '@material-ui/icons/History';
import RecreationModal from './components/Modal';
import LeftDrawer from './components/Drawer';
import BottomDrawer from './components/BottomDrawer';
import {closeDrawer, setAndOpenDrawer, openSuggestionBox, closeSnackBar} from './actions/actions';
import {openBottomDrawer} from './actions/bottomdrawer';
import { Scrollbars } from 'react-custom-scrollbars';
import Tooltip from '@material-ui/core/Tooltip';
import LocalPostOffice from '@material-ui/icons/LocalPostOffice'
import SuggestionModal from './components/SuggestionModal';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import SentimentVerySatisfied from '@material-ui/icons/SentimentVerySatisfied';
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from './components/Login';
import { withRouter } from "react-router-dom";

const boredHistory = createBrowserHistory();

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  textColor: {
    color: theme.palette.secondary.dark,
    cursor: 'pointer'
  },
  snackbarContent: {
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.secondary.dark
  }
})

class App extends Component {

state = {
  mouseOverFace: false,
  currentUI: 'main'
}

setSatisfiedTrue = () => {
  this.setState({mouseOverFace: true})
}

setSatisfiedFalse = () => {
  this.setState({mouseOverFace: false})
}

setCurrentUI = (uiType) => this.setState({currentUI: uiType})
  render(){
    const { classes, openLeftDrawer, closeLeftDrawer, openSuggestion, openSuggestBox, modalStatus, openSnackbar } = this.props
    return (
      <Router history={boredHistory}>
      <div className="app-container">
        <div className={classes.root}>
          <AppBar position='sticky' color='primary'>
            <Toolbar>
              <Typography variant='title' className={classes.textColor} onClick={() => this.setCurrentUI('main')}>
                I'm Bored...
              </Typography>
              <Tooltip title="Favorites">
                <IconButton className={classes.textColor} onClick={() => openLeftDrawer('favorites')} data-cy="drawer-access-btn">
                  <SvgIcon className={classes.textColor}> <path d={Favorites}/> </SvgIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="History">
                <IconButton className={classes.textColor} color="secondary" onClick={() => openLeftDrawer('history')} data-cy="drawer-access-btn">
                  <History/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Suggest New Activity">
              <IconButton className={classes.textColor} onClick={openSuggestion}>
                <LocalPostOffice/>
              </IconButton>
              </Tooltip>
              <Tooltip title="Jokester!">
              <IconButton
              onMouseOver={this.setSatisfiedTrue}
              onMouseOut={this.setSatisfiedFalse}
              data-cy="bottom-drawer-icon"
              onClick={this.props.openBottomDrawer}>
              {this.state.mouseOverFace ? <SentimentVerySatisfied/> : <SentimentSatisfied/>}
              </IconButton>
              </Tooltip>
              <Tooltip title="Login">
              <IconButton data-cy="login-page-btn" onClick={() => this.setCurrentUI('login')}>
               <ExitToApp/>
              </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          {this.state.currentUI === 'main' ? <RecreationGrid/> : <Login/>}
          <RecreationModal/>
          <SuggestionModal/>
          <LeftDrawer/>
          <BottomDrawer/>
          <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={openSnackbar}
          onClose={this.props.closeSnackBar}
          autoHideDuration={3000}
          >
          <SnackbarContent
            className={classes.snackbarContent}
            message="Your suggestion was sucessfully sent!"/>
          </Snackbar>
        </div>
      </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  const {drawerType, drawerOpen, modalStatus} = state.core
  const { openSuggestBox, openSnackbar } = state.suggestion
  return {
    drawerType,
    drawerOpen,
    openSuggestBox,
    modalStatus,
    openSnackbar
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeLeftDrawer: () => dispatch(closeDrawer()),
    openLeftDrawer: (drawerType) => dispatch(setAndOpenDrawer(drawerType)),
    openSuggestion: () => dispatch(openSuggestionBox()),
    closeSnackBar: () => dispatch(closeSnackBar()),
    openBottomDrawer: () => dispatch(openBottomDrawer())
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App))
