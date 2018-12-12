import {
  SELECTED_CATEGORY,
  FETCHING_API_DATA,
  RECEIVED_API_DATA,
  OPEN_MODAL,
  CLOSE_MODAL
}
from '../actions/actions';

//Favorites is the array for the list of the users favorites


const initialState = {
  favorites: [],
  history: [],
  fetchingApiData: false,
  receivedApiData: false,
  apiData: {},
  currentCategory: false,
  modalStatus: false

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
      receivedApiData: true,
      history: [...state.history, action.data]
    })
    case 'OPEN_MODAL':
    return Object.assign({}, state, {
      modalStatus: true
    })
    case 'CLOSE_MODAL':
    return Object.assign({}, state, {
      modalStatus: false
    })
    default:
    return state;
  }
}

export default reducer;
