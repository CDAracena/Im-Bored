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
import {confirmOldToken, logOutUser} from './actions/token';
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
  },
  thumbVertical: {
    backgroundColor: theme.palette.primary.main
  }
})

class App extends Component {

state = {
  mouseOverFace: false,
  currentUI: 'main',
  userName: ''
}

setSatisfiedTrue = () => {
  this.setState({mouseOverFace: true})
}

setSatisfiedFalse = () => {
  this.setState({mouseOverFace: false})
}

setCurrentUI = (uiType) => this.setState({currentUI: uiType})

handleAuthOptions = () => {
  if (this.props.currentUser.email){
    this.setCurrentUI('main')
    this.props.logOutUser(this.props.uid, this.props.client, this.props.accessToken)
  } else {
    this.setCurrentUI('login')
  }
}

componentDidMount() {
  if (localStorage.boredToken){
    const {uid, client, accessToken} = JSON.parse(localStorage.boredToken)
    this.props.confirmOldToken(uid, client, accessToken)
  }
}

componentDidUpdate(prevProps, prevState) {
  const {currentUser} = this.props
  if (currentUser !== prevProps.currentUser) {
    if (currentUser.email) {
      this.setState({userName: currentUser.username || currentUser.email.split('@')[0]})
    } else {
      this.setState({userName: ''})
    }
  }
}

  render(){
    const { classes, openLeftDrawer, closeLeftDrawer, openSuggestion, openSuggestBox, modalStatus, openSnackbar } = this.props
    const {currentUI} = this.state
    return (

      <div className="app-container">
        <div className={classes.root}>
          <AppBar position='sticky' color='primary'>
            <Toolbar>
              <Typography variant='title' className={classes.textColor} onClick={() => this.setCurrentUI('main')}>
                {this.state.userName ? this.state.userName : "I'm Bored..."}
              </Typography>
              <Tooltip title="Favorites">
                <IconButton className={classes.textColor} onClick={() => openLeftDrawer('favorites')} data-cy="drawer-access-btn" disabled={currentUI === 'login'}>
                  <SvgIcon className={classes.textColor}> <path d={Favorites}/> </SvgIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="History">
                <IconButton className={classes.textColor} color="secondary" onClick={() => openLeftDrawer('history')} data-cy="drawer-access-btn" disabled={currentUI === 'login'}>
                  <History/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Suggest New Activity">
              <IconButton className={classes.textColor} onClick={openSuggestion} disabled={currentUI === 'login'}>
                <LocalPostOffice/>
              </IconButton>
              </Tooltip>
              <Tooltip title="Jokester!">
              <IconButton
              onMouseOver={this.setSatisfiedTrue}
              onMouseOut={this.setSatisfiedFalse}
              data-cy="bottom-drawer-icon"
              disabled={currentUI === 'login'}
              onClick={this.props.openBottomDrawer}>
              {this.state.mouseOverFace ? <SentimentVerySatisfied/> : <SentimentSatisfied/>}
              </IconButton>
              </Tooltip>
              <Tooltip title={this.props.currentUser.email ? 'Log Out' : 'Log In'}>
              <IconButton data-cy="login-page-btn" onClick={this.handleAuthOptions}>
               <ExitToApp/>
              </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          {currentUI === 'main' ? <RecreationGrid/> : <Login/>}
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
    )
  }
}

const mapStateToProps = (state) => {
  const {drawerType, drawerOpen, modalStatus} = state.core
  const { openSuggestBox, openSnackbar } = state.suggestion
  const {currentUser, accessToken, uid, client} = state.token
  return {
    drawerType,
    drawerOpen,
    openSuggestBox,
    modalStatus,
    openSnackbar,
    currentUser,
    accessToken,
    uid,
    client
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeLeftDrawer: () => dispatch(closeDrawer()),
    openLeftDrawer: (drawerType) => dispatch(setAndOpenDrawer(drawerType)),
    openSuggestion: () => dispatch(openSuggestionBox()),
    closeSnackBar: () => dispatch(closeSnackBar()),
    openBottomDrawer: () => dispatch(openBottomDrawer()),
    confirmOldToken: (uid, client, accessToken) => dispatch(confirmOldToken(uid, client, accessToken)),
    logOutUser: (uid, client, accessToken) => dispatch(logOutUser(uid, client, accessToken))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App))
