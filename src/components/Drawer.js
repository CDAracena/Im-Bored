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
import Person from '@material-ui/icons/Person'
import MailIcon from '@material-ui/icons/Mail';
import {closeDrawer, deleteFromFavorites, addToFavorites} from '../actions/actions';
import Delete from '@material-ui/icons/Delete';
import Favorite from '@material-ui/icons/Favorite';
import Search from '@material-ui/icons/Search';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import Input from '@material-ui/core/Input';
import Link from '@material-ui/icons/Link';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Scrollbars } from 'react-custom-scrollbars';


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
  },
  notInFavorites: {
    color: theme.palette.secondary.main
  },
  inputText: {
    color: theme.palette.primary.light
  },
  inputField: {
    marginBottom: '5px'
  },
  thumbVertical: {
    backgroundColor: theme.palette.primary.main
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
    {type: 'busywork', icon: Work}
  ],
      education: true,
      recreational: true,
      social: true,
      charity: true,
      diy: true,
      relaxation: true,
      music: true,
      busywork: true,
      cooking: true,
      searchInput: '',
      searchParticipants: 1,
      numberInputErr: false
      }

      componentDidUpdate(prevProps) {
        if (prevProps.drawerOpen !== this.props.drawerOpen) {
          this.setState({searchInput: '', searchParticipants: 1})
        }
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

redirect = (item) => {
  if (item.link) {
    window.open(item.link, '_blank')
  }
}

primaryTextRender = (apiItem) => {
  const {classes} = this.props;
  if (apiItem.activity && apiItem.link) {
      return (
        <Fragment>
        {apiItem.activity}
        <span>
        <Tooltip title="Link" placement="right">
        <IconButton className={classes.drawerText} onClick={() => this.redirect(apiItem)}>
        <Link/>
        </IconButton>
        </Tooltip>
        </span>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
        {apiItem.activity}
        </Fragment>
      )
    }
  }

  setParticipantFilter = (e) => {
    if (Number(e.target.value)){
        this.setState({searchParticipants: e.target.value})
      } else {
        this.setState({numberInputErr: true})
      }
    }

    setInputErrOff = () => this.setState({numberInputErr: false})



filterParticipants = item => item.participants >= this.state.searchParticipants

searchFilter = item => item.activity.toLowerCase().includes(this.state.searchInput.toLowerCase()) || item.type.toLowerCase().includes(this.state.searchInput.toLowerCase())

  filterChoice = (item) => this.state[item.type] === true

  render() {
    const {classes, drawerOpen, drawerType, deleteItem, addToFavorites} = this.props;
    const sideList = (
      <div className={classes.drawer} data-cy="drawer-container">

      <List data-cy="drawer-list">
          <Scrollbars autoHeight={true}
            autoHeightMin={100}
            autoHeightMax={600}
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
            renderThumbVertical={props => <div {...props} className={classes.thumbVertical}/>}
            >
        {
          drawerType && this.props[drawerType].length > 0 ? this.renderSideListType(drawerType).filter(this.filterChoice).filter(this.searchFilter).filter(this.filterParticipants).map((item, index) => (<ListItem button={true} key={index} data-cy="drawer-list-item">
            <ListItemText primary={this.primaryTextRender(item)} classes={{primary: classes.drawerText}} onClick={() => this.redirect(item)} />
            <ListItemSecondaryAction>
              <IconButton onClick={ drawerType === 'favorites' ? ()=> deleteItem(item) : ()=> addToFavorites(item)} className={this.props.favorites.includes(item) ? classes.trashCan : classes.notInFavorites}>
              {drawerType === 'favorites' ? <Delete data-cy="delete-icon"/> : <Favorite/>}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>))
          :
          <ListItem>
          <ListItemText primary={`You currently have no boring antidotes in ${drawerType}`} classes={{primary: classes.notInFavorites}}/>
        </ListItem>
        }
        </Scrollbars>
      </List>

      <Divider/>
    </div>

    );

    return (

      <div>
      <Drawer open={drawerOpen} onClose={this.props.closeLeftDrawer} anchor='left' classes={{paper : classes.paperAnchorLeft}}>
        <Grid container justify="space-between" alignItems="center" style={{paddingTop: '15px'}}>
          <Grid item>
            <Typography variant="h5" color="primary" style={{paddingLeft: '15px'}}>{drawerType.toUpperCase()}</Typography>
          </Grid>
          <Grid item>
        <IconButton color="primary" onClick={this.props.closeLeftDrawer} data-cy="chevron-left">
          <ChevronLeft/>
        </IconButton>
      </Grid>
      </Grid>
        <div>
          <Grid container justify='center' alignItems='center'>
            <Typography color="primary"> Filter: </Typography>
                {this.state.filterChoices.map((choice, idx) => <Grid item key={idx}>
                  <IconButton color={this.state[choice.type] ? 'primary' : 'secondary'} onClick={() => this.toggleChoice(choice.type)}>
                    <SvgIcon> <path d={choice.icon}/> </SvgIcon> </IconButton>
                 </Grid> )}
          </Grid>
          <Grid container justify="center">
          <Grid item>
            <Input placeholder="search"
              margin="dense"
              onChange={this.setSearchInput}
              classes={{input: classes.inputText}}
              className={classes.inputField}
              startAdornment= {
                <InputAdornment position="start" variant="outlined" classes={{positionStart: classes.drawerText}}> <Search/></InputAdornment>
              }
            />
            </Grid>
            <Grid item style={{width: '15%'}}>
            <Tooltip open={this.state.numberInputErr}
              title="Please input a #"
              onClose={this.setInputErrOff}>
              <Input type="number"
              inputProps={{min: 1, max: 10}}
              margin="dense"
              style={{width: '100%'}}
              classes={{input: classes.inputText}}
              className={classes.inputField}
              onChange={this.setParticipantFilter}
              value={this.state.searchParticipants}
              startAdornment={
                <InputAdornment position="start" variant="outlined" classes={{positionStart: classes.drawerText}}> <Person/> </InputAdornment>
              }
              />
              </Tooltip>
            </Grid>
          </Grid>
          <Divider className={classes.divider} variant="middle"/>
          {sideList}
        </div>
      </Drawer>
    </div>

  );
  }
}

const mapStateToProps = state => {
  const {apiData, favorites, history, drawerOpen, drawerType} = state.core
  return {
    apiData,
    favorites,
    history,
    drawerOpen,
    drawerType}
}

const mapDispatchToProps = dispatch => {
  return {
    closeLeftDrawer: () => dispatch(closeDrawer()),
    deleteItem: (item) => dispatch(deleteFromFavorites(item)),
    addToFavorites: (data) => dispatch(addToFavorites(data))

  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LeftDrawer))
