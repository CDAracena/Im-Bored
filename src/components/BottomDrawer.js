import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';


//Going to serve as a container for displaying the favorited jokes.

class BottomDrawer extends Component {
  state = {
  }

  render(){
    return(
      <Drawer anchor="bottom">
      </Drawer>
    )
  }
}

export default BottomDrawer;
