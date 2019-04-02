import React, { Component } from 'react';
import  {withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import { Router, Route, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import {signUserIn, createUser} from '../actions/token'
import CustomizedSnackbars from './LoginSnackBar';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
  loginContainer: {
    margin: 'auto',
    width: '70%'
  },
  errorMsgText: {
    color: theme.palette.error.main,
    textAlign: 'center'
  }
})

class Login extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    errorMsgs: this.props.token.errorMsgs || [],
    value: 'login'
  }

  handleChange = (e, value)=> this.setState({value})

  setEmail = (e) => this.setState({email: e.target.value})
  setUserPassword = (e) => this.setState({password: e.target.value})

  submitInputFields = () => {
    const {email, password, password_confirmation, username} = this.state
    let userData = {}
    if (this.state.value === 'login') {
      userData = {email, password}
      this.props.signInUser(userData)
  } else if (this.state.value === 'register') {
      userData = {email, password, password_confirmation, username}
      this.props.createNewUser(userData)
    }
  }

  setPasswordConfirmation = (e) => this.setState({password_confirmation: e.target.value})
  setUserName = (e) => this.setState({username: e.target.value})


  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      this.setState({username: '', email: '', password: '', password_confirmation: '', errorMsgs: []})
    }
    if (this.props.token.errorMsgs !== prevProps.token.errorMsgs) {
      this.setState({errorMsgs: this.props.token.errorMsgs})
    }
  }

  render(){
    const {classes} = this.props
    return (
      <React.Fragment>
      <Grid container justify="center" data-cy="login-box" className={classes.loginContainer}>
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
      {this.state.errorMsgs && <List>
        {this.state.errorMsgs.map((msg, idx) => <ListItem key={idx}><ListItemText primary={msg} classes={{primary: classes.errorMsgText}}/></ListItem>)}

        </List>
      }
      <InputComponent
      setEmail={this.setEmail}
      email={this.state.email}
      password={this.state.password}
      setPassword={this.setUserPassword}
      loginConfirm={this.submitInputFields}
      componentType={this.state.value}
      password_confirmation={this.state.password_confirmation}
      setPWConfirmation={this.setPasswordConfirmation}
      username={this.state.username}
      setUsername={this.setUserName}
      />
      </Grid>
      </Grid>
      {this.props.loginSnackBar.open && <CustomizedSnackbars/>}
      </React.Fragment>
    )
  }
}

const InputComponent = ({email, componentType, setEmail, password, setPassword, loginConfirm, password_confirmation, setPWConfirmation, username, setUsername}) => {

  return (
    <React.Fragment>
      <TextField
      required
      value={email}
      onChange={setEmail}
      placeholder="Enter your email"
      margin="normal"
      label="Email"/>
      {componentType === 'register' &&
      <TextField
      required
      value={username}
      onChange={setUsername}
      label="Username"
      margin="normal"
      paceholder="Create a username"
      />

      }
      <TextField
      required
      value={password}
      onChange={setPassword}
      type="password"
      placeholder="Enter your password"
      margin="normal"
      label="Password"/>
      {componentType === 'register' &&
      <TextField
      required
      value={password_confirmation}
      onChange={setPWConfirmation}
      type="password"
      label="Confirm Password"
      margin="normal"
      paceholder="Confirm your password"
      />

      }
      <Button onClick={loginConfirm} color="primary"> {componentType === 'login' ? 'Login' : 'Register'} </Button>
    </React.Fragment>
  )
}

const mapStateToProps = ({token, loginSnackBar}) => {
  return {
    token,
    loginSnackBar
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInUser: (userCreds) => dispatch(signUserIn(userCreds)),
    createNewUser: (userCreds) => dispatch(createUser(userCreds))
  }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login))
