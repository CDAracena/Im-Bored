import {fetchBoredData} from '../utils/api';

export const SELECTED_CATEGORY = "SELECTED_CATEGORY";
export const FETCHING_API_DATA = "FETCHING_API_DATA";
export const RECEIVED_API_DATA = "RECEIVED_API_DATA";

export const fetchApiData = (recreationType) => {
  return (dispatch) => {
    dispatch(fetchingApiData())
     return fetchBoredData(recreationType)
    .then(data => {
      dispatch(receivedApiData(data))
      console.log(data)
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
