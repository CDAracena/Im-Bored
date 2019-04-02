import {
  VALIDATING_TOKEN,
  TOKEN_IS_VALIDATED,
  SET_TOKEN,
  SET_USER_DATA,
  SET_ERROR_MESSAGES,
  CLEAR_USER_DATA,
  CLEAR_TOKEN
} from '../actions/token';

const initialState = {
  validating: false,
  isValidated: false,
  accessToken: '',
  uid: '',
  client: '',
  currentUser: {},
  expiry: '',
  errorMsgs: []
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
    case 'CLEAR_TOKEN':
    return Object.assign({}, state, {
      accessToken: '',
      uid: '',
      client: '',
      expiry: '',
      isValidated: false
    })
    case 'SET_USER_DATA':
    return Object.assign({}, state, {
      currentUser: action.currentUser
    })
    case 'CLEAR_USER_DATA':
    return Object.assign({}, state, {
      currentUser: {}
    })
    case 'SET_ERROR_MESSAGES':
    return Object.assign({}, state, {
      errorMsgs: action.errorMsgsCollection
    })
    default:
    return state;
  }
}

export default token;
