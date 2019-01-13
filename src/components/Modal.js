import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button'
import Person from '@material-ui/icons/Person'
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {closeModal, addToFavorites} from '../actions/actions';
import Favorite from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid'


function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    '@media (max-width:500px)': {
      width: '80%'
    }
  },
});

class RecreationModal extends React.Component {
  state = {
  }

  renderParticipants = (participantCount) => {
    let iconArray = [];
    for (let i = 0; i < participantCount; i++) {
      iconArray.push(i);
    }
    return(
      <Grid item>
        {iconArray.map(icon => <Person color="primary" key={icon}/>)}
      </Grid>
    )
  }

addDataToFavorites = (data) => {
  const {addToFavorites, closeModal} = this.props;
  addToFavorites(data);
  closeModal()
}

render(){
  const {classes, apiData, modalStatus, closeModal} = this.props
  return (
    <div>
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={modalStatus}
      onClose={closeModal}
      className="modalContainer">
      <div style={getModalStyle()} className={classes.paper}>
        <span style={{float: 'right'}}><IconButton color="primary" onClick={closeModal}> <Close/> </IconButton></span>
        <Typography variant="h6" id="modal-title">
          {apiData.activity}
        </Typography>
        <Grid container
          alignItems="center"
          direction="row">
        <Grid item>
        <Typography variant="subtitle1" id="simple-modal-description">
          Partipants:
        </Typography>
        </Grid>
        {this.renderParticipants(apiData.participants)}
        </Grid>
        <IconButton color="primary" onClick={() => this.addDataToFavorites(apiData)}> <Favorite/> </IconButton>
        <Modal />
      </div>
    </Modal>
  </div>
  )
}

}

const mapStateToProps = ({ apiData, modalStatus }) => {
  return {
    apiData,
    modalStatus
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    closeModal: () => dispatch(closeModal()),
    addToFavorites: (data) => dispatch(addToFavorites(data))
  }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RecreationModal))
