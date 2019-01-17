import {fetchBoredData} from '../utils/api';

export const SELECTED_CATEGORY = "SELECTED_CATEGORY";
export const FETCHING_API_DATA = "FETCHING_API_DATA";
export const RECEIVED_API_DATA = "RECEIVED_API_DATA";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const OPEN_DRAWER = "OPEN_DRAWER";
export const CLOSE_DRAWER = "CLOSE_DRAWER";
export const SET_DRAWER_TYPE = "SET_DRAWER_TYPE";
export const DELETE_FROM_FAVORITES = "DELETE_FROM_FAVORITES";
export const ADD_TO_HISTORY = "ADD_TO_HISTORY";
export const OPEN_SUGGESTION_BOX = "OPEN_SUGGESTION_BOX";
export const CLOSE_SUGGESTION_BOX = "CLOSE_SUGGESTION_BOX"


export const fetchApiData = (recreationType) => {
  return (dispatch) => {
    dispatch(fetchingApiData())
     return fetchBoredData(recreationType)
    .then(data => {
      if (data) {
        dispatch(receivedApiData(data))

      }
    })
    .catch(err => console.log(err))
  }
}

export const setAndOpenDrawer = (drawType) => {
  return (dispatch) => {
    dispatch(setDrawerType(drawType))
    dispatch(openDrawer())
  }
}


export const selectCategory = (category) => ({
  type: SELECTED_CATEGORY,
  category
})

export const fetchingApiData = () => ({
  type: FETCHING_API_DATA
})


export const receivedApiData = (data) => ({
  type: RECEIVED_API_DATA,
  data
})

export const addToHistory = (data) => ({
  type: ADD_TO_HISTORY,
  data
})

export const openModal = () => ({
  type: OPEN_MODAL
})

export const closeModal = () => ({
  type: CLOSE_MODAL
})

export const addToFavorites = (data) => ({
  type: ADD_TO_FAVORITES,
  data
})

export const openDrawer = () => ({
  type: OPEN_DRAWER
})

export const setDrawerType = (drawerType) => ({
  type: SET_DRAWER_TYPE,
  drawerType
})

export const closeDrawer = () => ({
  type: CLOSE_DRAWER
})

export const deleteFromFavorites = (favItem) => ({
  type: DELETE_FROM_FAVORITES,
  favItem
})

export const openSuggestionBox = () => ({
  type: OPEN_SUGGESTION_BOX
})

export const closeSuggestBox = () => ({
  type: CLOSE_SUGGESTION_BOX
})
