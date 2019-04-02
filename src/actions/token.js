import {
  signInUser,
  registerNewUser,
  validateOldToken,
  signUserOut
} from '../utils/api';

import {
  openLoginSnackbar,
  setVariant,
  setMessage
} from './loginSnackBar.js'


export const VALIDATING_TOKEN = "VALIDATING_TOKEN";
export const TOKEN_IS_VALIDATED = "TOKEN_IS_VALIDATED";
export const SET_TOKEN = "SET_TOKEN";
export const SET_USER_DATA = "SET_USER_DATA";
export const CLEAR_TOKEN = "CLEAR_TOKEN";
export const CLEAR_USER_DATA = "CLEAR_USER_DATA";
export const SET_ERROR_MESSAGES = "SET_ERROR_MESSAGES";

const setStorageToken = (token) => {
  localStorage.setItem('boredToken', JSON.stringify(token))
}

const clearStorageToken = () => {
  localStorage.removeItem('boredToken')
}

export const logOutUser = (uid, client, accessToken) => {
  return dispatch => {
    return signUserOut(uid, client, accessToken)
      .then(res => res.json())
      .then(data => {
        if (data) {
          clearStorageToken()
          dispatch(clearToken())
          dispatch(clearUserData())
        }
      })
      .catch(err => console.log(err))

  }
}

export const confirmOldToken = (uid, client, accessToken) => {
  return dispatch => {
    dispatch(validatingToken())
    return validateOldToken(uid, client, accessToken)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        const tokenObj = {
          accessToken: res.headers.get('access-token'),
          client: res.headers.get('client'),
          expiry: res.headers.get('expiry'),
          uid: res.headers.get('uid')
        }
        dispatch(tokenIsValidated())
        setStorageToken(tokenObj)
        dispatch(setStoreToken(tokenObj.accessToken, tokenObj.client, tokenObj.expiry, tokenObj.uid))
        return res.json()
      } else {
        console.log('Response error')
      }
    })
    .then(userData => dispatch(setUserData(userData.data)))
    .catch(err => console.log(err))
  }
}


export const validatingToken = () => ({
  type: VALIDATING_TOKEN
})

export const tokenIsValidated = () => ({
  type: TOKEN_IS_VALIDATED
})

export const setStoreToken = (accessToken, client, expiry, uid) => ({
    type: SET_TOKEN,
    accessToken: accessToken,
    client:client,
    expiry: expiry,
    uid: uid
})

export const clearToken = () => ({
  type: CLEAR_TOKEN
})

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  currentUser: userData
})

export const clearUserData = ()=> ({
  type: CLEAR_USER_DATA
})

export const createUser = (userCreds) => {
  return dispatch => {
    return registerNewUser(userCreds)
      .then(res => res.json())
      .then(userData => {
        if (userData.errors.full_messages) {
          dispatch(setErrorMsgs(userData.errors.full_messages))
        } else {
          const {email, password} = userCreds
          dispatch(signUserIn({email, password}))
        }
      })
      .catch(err => console.log(err))
  }
}

export const signUserIn = (userCreds) => {
  return dispatch => {
    dispatch(validatingToken())
    return signInUser(userCreds)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        const tokenObj = {
          accessToken: res.headers.get('access-token'),
          client: res.headers.get('client'),
          expiry: res.headers.get('expiry'),
          uid: res.headers.get('uid')
        }
        setStorageToken(tokenObj)
        dispatch(tokenIsValidated())
        dispatch(setStoreToken(tokenObj.accessToken, tokenObj.client, tokenObj.expiry, tokenObj.uid))
        dispatch(openSnackBar('success', 'Signed In Successfully!'))
      } else if (res.status >= 400){
        dispatch(openSnackBar('error', 'Error Loggin In!'))
      } else {
        console.log('Error')
      }
      return res.json()
    })
    .then(userData => {
      if (userData.errors) {
        dispatch(setErrorMsgs(userData.errors))
      } else {
        dispatch(setUserData(userData.data))
      }

    })
    .catch(err => console.log(err))
  }
}

export const openSnackBar = (variant, message) => {
  return dispatch => {
    dispatch(setVariant(variant))
    dispatch(setMessage(message))
    dispatch(openLoginSnackbar())
  }
}

export const setErrorMsgs = (errMsgArray) => ({
  type: SET_ERROR_MESSAGES,
  errorMsgsCollection: errMsgArray
})
