import React, { Component } from 'react';
import  {withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import { Router, Route, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';


const styles = theme => ({

})

class Login extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    errorMsg: '',
    value: 'login'
  }

  handleChange = (e, value)=> this.setState({value})

  setEmail = (e) => this.setState({email: e.target.value})
  setUserPassword = (e) => this.setState({password: e.target.value})

  submitInputFields = () => {
    const {email, password} = this.state
    const userData = {email, password}
    fetch(`${process.env.REACT_APP_RAILS_LOCAL}/api/auth/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    }).then(res => res.json())
      .then(data => console.log(data))

  }
  render(){

    return (
      <Grid container justify="center" data-cy="login-box">
      <Grid item>
      <Tabs
      value={this.state.value}
      onChange={this.handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered>
      <Tab label="login" value="login"/>
      <Tab label="register" value="register"/>
      </Tabs>
      </Grid>
      <Grid container justify="center" direction="column" data-cy="input-component-container">
      <InputComponent
      setEmail={this.setEmail}
      email={this.state.email}
      password={this.state.password}
      setPassword={this.setUserPassword}
      loginConfirm={this.submitInputFields}
      />
      </Grid>
      </Grid>
    )
  }
}

const InputComponent = ({email, componentType, setEmail, password, setPassword, loginConfirm}) => {

  return (
    <React.Fragment>
      <TextField
      required
      value={email}
      onChange={setEmail}
      placeholder="Enter your email"
      margin="normal"
      label="Email"/>

      <TextField
      required
      value={password}
      onChange={setPassword}
      placeholder="Enter your password"
      margin="normal"
      label="Password"/>
      <Button onClick={loginConfirm}> Login </Button>
    </React.Fragment>
  )
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
