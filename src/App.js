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
import RecreationModal from './components/Modal'

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

class App extends Component {
  state = {
    openModal: false
  }

  render(){
    const { classes } = this.props
    return (
      <div className="app-container">
        <div className={classes.root}>
          <AppBar position='sticky' color='primary'>
            <Toolbar>
              <Typography variant='h6' color='secondary'>
                I'm Bored...
              </Typography>
                <IconButton className={classes.menuButton} color="secondary">
                  <SvgIcon color="secondary"> <path d={Favorites}/> </SvgIcon>
                </IconButton>
                <IconButton className={classes.menuButton} color="secondary">
                  <History/>
                </IconButton>
            </Toolbar>
          </AppBar>
          <RecreationGrid/>
          <RecreationModal/>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(App);
