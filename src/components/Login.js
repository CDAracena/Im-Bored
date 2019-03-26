import React, { Component } from 'react';
import  {withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import { Router, Route, Link } from "react-router-dom";

const styles = theme => ({

})

class Login extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  }
  render(){
    return (
      <div data-cy="login-box">
      login in
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login))
