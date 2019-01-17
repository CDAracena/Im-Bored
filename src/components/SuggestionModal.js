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
import Input from '@material-ui/core/Input';
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
    participants: 1
  }

userCreating = (e) => {
  const {creatingActivity} = this.props
    creatingActivity()
    if (e.target.value.length >= 4) {
      this.setState({activityTitle: e.target.value})
    }
}

setCategory = (e) => {
  this.setState({selectedCategory: e.target.value})
}

setParticipants = (e) => {
  this.setState({participants: e.target.value})
}


componentDidUpdate(prevProps, prevState) {
  if (this.props.openSuggestBox !== prevProps.openSuggestBox){
    this.setState({
      activityTitle: '',
      selectedCategory: '',
    })
  }
}


  render() {
    const {openSuggestBox, closeSuggestionBox} = this.props
    console.log(this.state.selectedCategory)
    console.log(this.state.activityTitle)
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
           name="Activity"
           type="text"
           fullWidth
           required={true}
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
          <InputLabel htmlFor="participants"> Participants </InputLabel>
          <Input type="number" required={true}
          name="participants"
          inputProps={{min: 1}}
          value={this.state.participants}
          onChange={this.setParticipants}/>
       </DialogContent>
       <DialogActions>
         <Button onClick={closeSuggestionBox} color="primary">
           Cancel
         </Button>
         <Button onClick={this.handleClose} color="primary" disabled={this.state.activityTitle < 4 || !this.state.selectedCategory}>
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
