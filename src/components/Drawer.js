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
import {closeDrawer, deleteFromFavorites, addToFavorites} from '../actions/actions';
import Delete from '@material-ui/icons/Delete';
import Favorite from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import {Education, BikeRide, Social, Diy, Charity, Cook, Spa, Music, Work} from '../utils/svg_icons';


const styles = (theme) => ({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  drawer: {
    backgroundColor: theme.palette.primary
  },
  trashCan: {
    color: '#C3423F'
  }

});

class LeftDrawer extends React.Component {
  state = {
    filterChoices:[
{type: 'education', icon: Education},
{type: 'recreational', icon: BikeRide},
{type:'social', icon: Social},
{type: 'diy', icon: Diy},
{type: 'charity', icon:Charity},
{type: 'cooking', icon: Cook},
{type: 'relaxation', icon: Spa},
{type: 'music', icon: Music},
{type: 'busywork', icon: Work}],

      }

  renderSideListType = (type) => {
    switch (type) {
      case 'favorites':
        return this.props.favorites;
      case 'history':
        return this.props.history;
    }
  }

  filterChoice = (choice) => {
    console.log(choice)
  }

  render() {
    const {classes, drawerOpen, drawerType, deleteItem, addToFavorites} = this.props;
    const sideList = (<div className={classes.drawer}>
      <List>
        {
          drawerType && this.renderSideListType(drawerType).map((item, index) => (<ListItem button="button" key={index}>
            <ListItemText primary={item.activity}/>
            <ListItemSecondaryAction>
              <IconButton onClick={ drawerType === 'favorites' ? ()=> deleteItem(item) : ()=> addToFavorites(item)} className={classes.trashCan}>
              {drawerType === 'favorites' ?  <Delete/> : <Favorite/>}
              </IconButton>
            </ListItemSecondaryAction>
            <List>
              {item.link && <ListItem button component="a" href={`${item.link}`}> <ListItemText primary={item.link}/> </ListItem>}
            </List>
          </ListItem>))
        }
      </List>
      <Divider/>
    </div>);

    return (<div>
      <Drawer open={drawerOpen} onClose={this.props.closeLeftDrawer}>
        <div>
          <Grid container justify='center' alignItems='center'>
            <Typography color="primary"> Filter </Typography>
                {this.state.filterChoices.map((choice, idx) => <Grid>
                  <IconButton color="primary" onClick={() => this.filterChoice(choice.type)}> <SvgIcon> <path d={choice.icon}/> </SvgIcon> </IconButton>
                 </Grid> )}
          </Grid>
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
    deleteItem: (item) => dispatch(deleteFromFavorites(item)),
    addToFavorites: (data) => dispatch(addToFavorites(data))

  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LeftDrawer))
