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
import {closeDrawer, setAndOpenDrawer} from './actions/actions';
import { Scrollbars } from 'react-custom-scrollbars';

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
  }
})

class App extends Component {

  render(){
    const { classes, openLeftDrawer, closeLeftDrawer } = this.props
    return (
      <div className="app-container">
        <div className={classes.root}>
          <AppBar position='sticky' color='primary'>
            <Toolbar>
              <Typography variant='h6' className={classes.textColor}>
                I'm Bored...
              </Typography>
                <IconButton className={classes.textColor} onClick={() => openLeftDrawer('favorites')}>
                  <SvgIcon className={classes.textColor}> <path d={Favorites}/> </SvgIcon>
                </IconButton>
                <IconButton className={classes.textColor} color="secondary" onClick={() => openLeftDrawer('history')}>
                  <History/>
                </IconButton>
            </Toolbar>
          </AppBar>
          <RecreationGrid/>
          <RecreationModal/>
          <LeftDrawer/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({drawerType, drawerOpen}) => {
  return {
    drawerType,
    drawerOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeLeftDrawer: () => dispatch(closeDrawer()),
    openLeftDrawer: (drawerType) => dispatch(setAndOpenDrawer(drawerType))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App))
