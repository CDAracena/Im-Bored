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
  }
}

export const fetchNewDadJoke = () => {
  return dispatch => {
    dispatch(fetchingDadJoke())
  }
}

export const fetchNewLifeAdvice = () => {
  return dispatch => {
    dispatch(fetchingLifeAdvice())
  }
}

export const fetchNewCorporateBS = () => {
  return dispatch => {
    dispatch(fetchingCorporateBS())
  }
}

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
