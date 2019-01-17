import React, {Fragment, Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button'
import {closeSuggestBox} from '../actions/actions';

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

  render() {
    const {openSuggestBox, closeSuggestionBox} = this.props
    return (
      <div>
      <Modal
      className="suggestionBox"
      open={openSuggestBox}
      close={closeSuggestionBox}>
        Testing
      </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {openSuggestBox} = state.suggestion
  return{
    openSuggestBox
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeSuggestionBox: () => dispatch(closeSuggestBox())
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SuggestionModal))
