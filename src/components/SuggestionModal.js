import React, {Fragment, Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button'
import {closeSuggestBox, creatingActivity} from '../actions/actions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  font: {
    color: 'red'
  }
})


class SuggestionModal extends React.Component{
  state = {
    activityTitle: '',
    typeCategories: ['Relaxation', 'Education', 'Social', "DIY", 'Music', 'Charity', 'Busywork', 'Cooking', 'Recreational'],
    selectedCategory: '',
    participants: 0
  }

userCreating = (e) => {
  const {creatingActivity} = this.props
  if (e.target.value.length > 3) {
    creatingActivity()
  this.setState({activityTitle: e.target.value})
  }
}

setCategory = (e) => {
  this.setState({selectedCategory: e.target.value})
  console.log(this.state.selectedCategory)
}
  render() {
    const {openSuggestBox, closeSuggestionBox} = this.props
    return (
    <div>
     <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
       Open form dialog
     </Button>
     <Dialog
       open={openSuggestBox}
       onClose={closeSuggestionBox}
       aria-labelledby="form-dialog-title"
     >
       <DialogTitle id="form-dialog-title">Suggest A New Activity</DialogTitle>
       <DialogContent>
         <DialogContentText>
           Suggest a new activity to the Bored API team and see your activity in future displays!
         </DialogContentText>
         <TextField
           autoFocus
           margin="dense"
           id="activityTitle"
           label="Activity"
           type="text"
           fullWidth
           onChange={this.userCreating}
         />
         <InputLabel htmlFor="categorySelect"> Category </InputLabel>
         <Select
          value={this.state.selectedCategory}
          onChange={this.setCategory}
          name="categorySelect">
          <MenuItem value="" disabled>Category </MenuItem>
          {this.state.typeCategories.map((cat, index )=> <MenuItem value={cat} key={index}> {cat} </MenuItem>)}
          </Select>
       </DialogContent>
       <DialogActions>
         <Button onClick={closeSuggestionBox} color="primary">
           Cancel
         </Button>
         <Button onClick={this.handleClose} color="primary" disabled={!this.state.activityTitle && !this.state.selectedCategory}>
           Send
         </Button>
       </DialogActions>
     </Dialog>
  </div>
    )
  }
}

const mapStateToProps = state => {
  const {openSuggestBox, } = state.suggestion
  return{
    openSuggestBox
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeSuggestionBox: () => dispatch(closeSuggestBox()),
    creatingActivity: () => dispatch(creatingActivity())
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SuggestionModal))
