import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button'
import Person from '@material-ui/icons/Person'
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {closeModal, addToFavorites, addToHistory} from '../actions/actions';
import Favorite from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';


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
  progress: {
    display:'flex',
    justfiyContent:'center'
  }
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
  const {addToFavorites, closeModal, favorites} = this.props;
  const duplicate = favorites.find(item => item.key === data.key)
  if (!duplicate){
    addToFavorites(data);
  }
  closeModal()
}

componentDidUpdate(prevProps) {
    if (this.props.apiData !== prevProps.apiData && this.props.receivedApiData) {
      const duplicate = this.props.history.find(item => item.key === this.props.apiData.key)
      if (!duplicate) {
        this.props.addToHistory(this.props.apiData)
      }
  }
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
      className="modalContainer"
      data-cy="activity-modal">
      <div style={getModalStyle()} className={classes.paper}>
      {this.props.fetchingApiData ? <div style={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress color="primary"/>
        </div>
      :
      <Fragment>
      <span style={{float: 'right'}}><IconButton color="primary" data-cy="close-activity-modal" onClick={closeModal}> <Close/> </IconButton></span>
        <Typography variant="title" id="modal-title">
          {apiData.activity}
        </Typography>
        <Grid container
          alignItems="center"
          direction="row">
        <Grid item>
        <Typography variant="subheading" id="simple-modal-description">
          Partipants:
        </Typography>
        </Grid>
        {this.renderParticipants(apiData.participants)}
        </Grid>
        <Tooltip title="Add to favorites">
        <IconButton color="primary" onClick={() => this.addDataToFavorites(apiData)} data-cy="addFavorite-btn"> <Favorite/> </IconButton>
        </Tooltip>
        </Fragment>}
      </div>
    </Modal>
  </div>
  )
}

}

const mapStateToProps = state => {
  const {apiData, modalStatus, favorites, receivedApiData, history, fetchingApiData} = state.core
  return {
    apiData,
    modalStatus,
    favorites,
    receivedApiData,
    history,
    fetchingApiData
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    closeModal: () => dispatch(closeModal()),
    addToFavorites: (data) => dispatch(addToFavorites(data)),
    addToHistory: (data) => dispatch(addToHistory(data))
  }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RecreationModal))
