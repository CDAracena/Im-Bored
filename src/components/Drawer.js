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
import Input from '@material-ui/core/Input';

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
  },
  paperAnchorLeft: {
    backgroundColor: theme.palette.secondary.dark,
    opacity: 0.9
  },
  divider: {
    backgroundColor: theme.palette.primary.light
  },
  drawerText: {
    color: theme.palette.primary.light
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
  education: true,
  recreational: true,
  social: true,
  charity: true,
  diy: true,
  relaxation: true,
  music: true,
  busywork: true,
  cooking: true,
  searchInput: ''

      }

  renderSideListType = (type) => {
    switch (type) {
      case 'favorites':
        return this.props.favorites;
      case 'history':
        return this.props.history;
    }
  }

  toggleChoice = (choice) => {
    this.setState({[choice]: !this.state[choice]})
  }

  setSearchInput = (e) => {
    this.setState({searchInput: e.target.value})
  }

  //have to set this.state.searchInput only to each specific drawer type. History search input only works for history / vice- versa
  // history items should not display heart if already on favorites... or maybe change icon color if already on favorites.

  filterChoice = (item) => this.state[item.type] === true

  render() {
    const {classes, drawerOpen, drawerType, deleteItem, addToFavorites} = this.props;
    const sideList = (<div className={classes.drawer}>
      <List>
        {
          drawerType && this.renderSideListType(drawerType).filter(this.filterChoice).map((item, index) => (<ListItem button={true} key={index}>
            <ListItemText primary={item.activity} classes={{primary: classes.drawerText}}/>
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

    return (<div >
      <Drawer open={drawerOpen} onClose={this.props.closeLeftDrawer} anchor='left' classes={{paper : classes.paperAnchorLeft}}>
        <div>
          <Grid container justify='center' alignItems='center'>
            <Typography color="primary"> Filter: </Typography>
                {this.state.filterChoices.map((choice, idx) => <Grid item key={idx}>
                  <IconButton color={this.state[choice.type] ? 'primary' : 'secondary'} onClick={() => this.toggleChoice(choice.type)}>
                    <SvgIcon> <path d={choice.icon}/> </SvgIcon> </IconButton>
                 </Grid> )}
          </Grid>
          <Grid container justify="center">
            <Input placeholder="search" margin="dense" onChange={this.setSearchInput}/>
          </Grid>
          <Divider className={classes.divider} variant="middle"/>
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
