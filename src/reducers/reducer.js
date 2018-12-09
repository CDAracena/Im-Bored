import {
  SELECTED_CATEGORY,
  FETCHING_API_DATA,
  RECEIVED_API_DATA
}
from '../actions/actions';

//Favorites is the array for the list of the users favorites
//fetching API Data set to true if api call is sent and response is good
// received api data after fetching, status 200 ok.
//api data, object for storing the response.data
//currentCategory string that displays the current category the user is in i.e. education, music

const initialState = {
  favorites: [],
  fetchingApiData: false,
  receivedApiData: false,
  apiData: {},
  currentCategory: false,

}

const reducer = (state=initialState, action) => {
  switch(action.type){
    case 'SELECTED_CATEGORY':
    return Object.assign({}, state, {
      currentCategory: action.category
    })
    case 'FETCHING_API_DATA':
    return Object.assign({}, state, {
      fetchingApiData: true
    })
    case 'RECEIVED_API_DATA':
    return Object.assign({}, state, {
      fetchingApiData: false,
      apiData: action.data,
      receivedApiData: true
    })
    default:
    return state;
  }
}

export default reducer;
