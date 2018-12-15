import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = (theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawer: {
    backgroundColor: theme.palette.primary
  }

});

class LeftDrawer extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes, favorites, history, drawerOpen, drawerType } = this.props;
    const sideList = (
      <div className={classes.drawer}>
        <List>
          {history.map((item, index) => (
            <ListItem button  key={index}>
              <ListItemText primary={item.activity}/>
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    );


    return (
      <div>
        <Drawer open={drawerOpen} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({apiData, favorites, history, drawerOpen, drawerType}) => {
  return {
    apiData,
    favorites,
    history,
    drawerOpen,
    drawerType
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LeftDrawer))
