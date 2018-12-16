import {
  SELECTED_CATEGORY,
  FETCHING_API_DATA,
  RECEIVED_API_DATA,
  OPEN_MODAL,
  CLOSE_MODAL,
  ADD_TO_FAVORITES,
  OPEN_DRAWER,
  CLOSER_DRAWER,
  SET_DRAWER_TYPE
}
from '../actions/actions';


//creation actions for drawer - status and type. favorites / history

const initialState = {
  favorites: [],
  history: [],
  fetchingApiData: false,
  receivedApiData: false,
  apiData: {},
  currentCategory: '',
  modalStatus: false,
  drawerOpen: false,
  drawerType: ''

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
      modalStatus: false,
      currentCategory: ''
    })
    case 'ADD_TO_FAVORITES':
      if(!state.favorites.includes(action.data)) {
      return Object.assign({}, state, {
        favorites: [...state.favorites, action.data]
      })
    } else {
      return state;
    }
    case 'OPEN_DRAWER':
    return Object.assign({}, state, {
      drawerOpen: true
    })
    case 'SET_DRAWER_TYPE':
    return Object.assign({}, state, {
      drawerType: action.drawerType
    })
    case 'CLOSE_DRAWER':
    return Object.assign({}, state, {
      drawerOpen: false,
      drawerType: ''
    })
    default:
    return state;
  }
}

export default reducer;
