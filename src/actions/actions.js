import {fetchBoredData} from '../utils/api';

export const SELECTED_CATEGORY = "SELECTED_CATEGORY";
export const FETCHING_API_DATA = "FETCHING_API_DATA";
export const RECEIVED_API_DATA = "RECEIVED_API_DATA";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";

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
