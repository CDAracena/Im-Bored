import {
  OPEN_LOGIN_SNACKBAR,
  CLOSE_LOGIN_SNACKBAR,
  SET_VARIANT,
  SET_MESSAGE
} from '../actions/loginSnackBar';

const initialState = {
  open: false,
  variant: '',
  message: ''
}

const loginSnackBar = (state = initialState, action) => {
  switch(action.type){
    case 'OPEN_LOGIN_SNACKBAR':
    return Object.assign({}, state, {
      open: true
    })
    case 'CLOSE_LOGIN_SNACKBAR':
    return Object.assign({}, state, {
      open: false,
      variant: '',
      message: ''
    })
    case 'SET_VARIANT':
    return Object.assign({}, state, {
      variant: action.variant
    })
    case 'SET_MESSAGE':
    return Object.assign({}, state, {
      message: action.message
    })
    default:
    return state;
  }
}

export default loginSnackBar;
