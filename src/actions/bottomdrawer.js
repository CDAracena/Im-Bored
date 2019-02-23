import {
  fetchGeekJoke,
  fetchDadJoke,
  fetchCorporateBS,
  fetchAdvice
} from '../utils/api';

export const OPEN_BOTTOM_DRAWER = "OPEN_BOTTOM_DRAWER";
export const CLOSE_BOTTOM_DRAWER = "CLOSE_BOTTOM_DRAWER";
export const FETCH_GEEK_JOKE = "FETCH_GEEK_JOKE";
export const FETCHING_GEEK_JOKE = "FETCHING_GEEK_JOKE";
export const FETCH_DAD_JOKE = "FETCH_DAD_JOKE";
export const FETCHING_DAD_JOKE = "FETCHING_DAD_JOKE";
export const FETCH_CORPORATE_JOKE = "FETCH_CORPORATE_JOKE";
export const FETCHING_CORPORATE_JOKE = "FETCHING_CORPORATE_JOKE";
export const FETCH_LIFE_ADVICE_JOKE = "FETCH_LIFE_ADVICE_JOKE";
export const FETCHING_LIFE_ADVICE_JOKE = "FETCHING_LIFE_ADVICE_JOKE"

export const openBottomDrawer = () => ({
  type: OPEN_BOTTOM_DRAWER
})

export const closeBottomDrawer = () => ({
  type: CLOSE_BOTTOM_DRAWER
});

export const fetchNewGeekJoke = () => {
  return dispatch => {
    dispatch(fetchingGeekJoke())
    return fetchGeekJoke()
      .then(joke => {
        dispatch(getGeekData(joke))
      })
  }
}

export const getGeekData = (data) => ({
  type: FETCH_GEEK_JOKE,
  data: data
})

export const fetchNewDadJoke = () => {
  return dispatch => {
    dispatch(fetchingDadJoke())
    return fetchDadJoke()
      .then(joke => {
        dispatch(getDadData(joke))
      })
  }
}

export const getDadData = (data) => ({
  type: FETCH_DAD_JOKE,
  data: data
})

export const fetchNewLifeAdvice = () => {
  return dispatch => {
    dispatch(fetchingLifeAdvice())
    return fetchAdvice()
    .then(joke => {
      dispatch(getLifeAdvice(joke))
    })
  }
}

export const getLifeAdvice = (data) =>({
  type: FETCH_LIFE_ADVICE_JOKE,
  data: data
})

export const fetchNewCorporateBS = () => {
  return dispatch => {
    dispatch(fetchingCorporateBS())
    return fetchCorporateBS()
    .then(joke => {
      dispatch(getCorporateBS(joke))
    })
  }
}

export const getCorporateBS = (data) => ({
  type: FETCH_CORPORATE_JOKE,
  data: data
})

export const fetchingGeekJoke = () => ({
type:  FETCHING_GEEK_JOKE
})

export const fetchingDadJoke = () => ({
  type: FETCHING_DAD_JOKE
})

export const fetchingLifeAdvice = () => ({
  type: FETCHING_LIFE_ADVICE_JOKE
})

export const fetchingCorporateBS = () => ({
  type:FETCHING_CORPORATE_JOKE
})
