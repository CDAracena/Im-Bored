export const OPEN_LOGIN_SNACKBAR = "OPEN_LOGIN_SNACKBAR";
export const CLOSE_LOGIN_SNACKBAR = "CLOSE_LOGIN_SNACKBAR";
export const SET_VARIANT = "SET_VARIANT";
export const SET_MESSAGE = "SET_MESSAGE";


export const openLoginSnackbar = () => ({
  type: OPEN_LOGIN_SNACKBAR
})

export const closeLoginSnackbar = () => ({
  type: CLOSE_LOGIN_SNACKBAR
})

export const setVariant = (variant) => ({
  type: SET_VARIANT,
  variant
})

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  message
})
