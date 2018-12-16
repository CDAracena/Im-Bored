import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {closeDrawer, deleteFromFavorites} from '../actions/actions';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = (theme) => ({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  drawer: {
    backgroundColor: theme.palette.primary
  }

});

class LeftDrawer extends React.Component {

  renderSideListType = (type) => {
    switch (type) {
      case 'favorites':
        return this.props.favorites;
      case 'history':
        return this.props.history;
    }
  }

  render() {
    const {classes, drawerOpen, drawerType, deleteItem} = this.props;
    const sideList = (<div className={classes.drawer}>
      <List>
        {
          drawerType && this.renderSideListType(drawerType).map((item, index) => (<ListItem button="button" key={index}>
            <ListItemText primary={item.activity}/>
            <ListItemSecondaryAction>
              <IconButton onClick={()=> deleteItem(item)}>
                <Delete/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>))
        }
      </List>
      <Divider/>
    </div>);

    return (<div>
      <Drawer open={drawerOpen} onClose={this.props.closeLeftDrawer}>
        <div>
          {sideList}
        </div>
      </Drawer>
    </div>);
  }
}

const mapStateToProps = ({apiData, favorites, history, drawerOpen, drawerType}) => {
  return {apiData, favorites, history, drawerOpen, drawerType}
}

const mapDispatchToProps = dispatch => {
  return {
    closeLeftDrawer: () => dispatch(closeDrawer()),
    deleteItem: (item) => dispatch(deleteFromFavorites(item))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LeftDrawer))
