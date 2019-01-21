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
import {closeDrawer, setAndOpenDrawer, openSuggestionBox, closeSnackBar} from './actions/actions';
import { Scrollbars } from 'react-custom-scrollbars';
import Tooltip from '@material-ui/core/Tooltip';
import LocalPostOffice from '@material-ui/icons/LocalPostOffice'
import SuggestionModal from './components/SuggestionModal';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';


const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  textColor: {
    color: theme.palette.secondary.dark
  },
  snackbarContent: {
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.secondary.dark
  }
})

class App extends Component {

  render(){
    const { classes, openLeftDrawer, closeLeftDrawer, openSuggestion, openSuggestBox, modalStatus, openSnackbar } = this.props
    return (
      <div className="app-container">
        <div className={classes.root}>
          <AppBar position='sticky' color='primary'>
            <Toolbar>
              <Typography variant='h6' className={classes.textColor}>
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
            </Toolbar>
          </AppBar>
          <RecreationGrid/>
          <RecreationModal/>
          <SuggestionModal/>
          <LeftDrawer/>
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
    closeSnackBar: () => dispatch(closeSnackBar())
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App))
