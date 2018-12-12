import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button'
import Person from '@material-ui/icons/Person'


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

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
  },
});

class RecreationModal extends React.Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({open: true})
  }
  handleClose = () => {
    this.setState({open: false})
  }


  renderParticipants = (participantCount) => {
    let iconArray = [];
    for (let i = 0; i < participantCount; i++) {
      iconArray.push(i);
    }
    return(
      <Fragment>
        {iconArray.map(icon => <Person color="primary" key={icon}/>)}
      </Fragment>
    )

  }

render(){
  const {classes, apiData, modalStatus} = this.props
  console.log(apiData.participants)
  return (
    <div>
    <Button onClick={this.handleOpen }>Open Modal</Button>
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={this.state.open || modalStatus}
      onClose={this.handleClose}
    >
      <div style={getModalStyle()} className={classes.paper}>
        <Typography variant="h6" id="modal-title">
          {apiData.activity}
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          Partipants {this.renderParticipants(apiData.participants)}
        </Typography>
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
  return;
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RecreationModal))
