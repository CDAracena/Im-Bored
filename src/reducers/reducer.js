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
    default:
    return state;
  }
}

export default reducer;
