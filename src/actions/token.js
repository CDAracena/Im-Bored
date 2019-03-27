import {
  signInUser
} from '../utils/api';

export const VALIDATING_TOKEN = "VALIDATING_TOKEN";
export const TOKEN_IS_VALIDATED = "TOKEN_IS_VALIDATED";
export const SET_TOKEN = "SET_TOKEN";
export const SET_USER_DATA = "SET_USER_DATA";

const setStorageToken = (token) => {
  if (!localStorage.getItem('boredToken')){
  localStorage.setItem('boredToken', JSON.stringify(token))
} else {
  console.log('token already in local storage')
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

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  currentUser: userData
})

export const signUserIn = (userCreds) => {
  return dispatch => {
    dispatch(validatingToken())
    signInUser(userCreds)
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
