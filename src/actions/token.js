import {
  signInUser,
  registerNewUser,
  validateOldToken
} from '../utils/api';

export const VALIDATING_TOKEN = "VALIDATING_TOKEN";
export const TOKEN_IS_VALIDATED = "TOKEN_IS_VALIDATED";
export const SET_TOKEN = "SET_TOKEN";
export const SET_USER_DATA = "SET_USER_DATA";
export const CLEAR_TOKEN = "CLEAR_TOKEN";
export const CLEAR_USER_DATA = "CLEAR_USER_DATA";

const setStorageToken = (token) => {
  localStorage.setItem('boredToken', JSON.stringify(token))
}


const clearStorageToken = () => {
  localStorage.removeItem('boredToken')
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
        const {email, password} = userCreds
        dispatch(signUserIn({email, password}))
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
        return res.json()
      } else {
        console.log('Something went wrong')
      }
    })
    .then(userData => dispatch(setUserData(userData.data)))
    .catch(err => console.log(err))
  }
}
