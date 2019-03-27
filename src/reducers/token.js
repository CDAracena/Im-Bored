import {
  VALIDATING_TOKEN,
  TOKEN_IS_VALIDATED,
  SET_TOKEN,
  SET_USER_DATA
} from '../actions/token';

const initialState = {
  validating: false,
  isValidated: false,
  accessToken: '',
  uid: '',
  client: '',
  currentUser: {},
  expiry: ''
}

const token = (state = initialState, action) => {
  switch(action.type) {
    case 'VALIDATING_TOKEN':
    return Object.assign({}, state, {
      validating: true
    })
    case 'TOKEN_IS_VALIDATED':
    return Object.assign({}, state, {
      isValidated: true,
      validating: false
    })
    case 'SET_TOKEN':
    return Object.assign({}, state, {
      accessToken: action.accessToken,
      uid: action.uid,
      client: action.client,
      expiry: action.expiry
    })
    case 'SET_USER_DATA':
    return Object.assign({}, state, {
      currentUser: action.currentUser
    })
    default:
    return state;
  }
}

export default token;
