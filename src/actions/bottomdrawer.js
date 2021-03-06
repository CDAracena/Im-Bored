import {
  fetchGeekJoke,
  fetchDadJoke,
  fetchCorporateBS,
  fetchAdvice,
  fetchKanyeQuote,
  fetchAnimalFact
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
export const FETCHING_LIFE_ADVICE_JOKE = "FETCHING_LIFE_ADVICE_JOKE";
export const ADD_TO_GEEK_FAVORITES = "ADD_TO_GEEK_FAVORITES";
export const ADD_TO_CORPORATEBS_FAVORITES = "ADD_TO_CORPORATEBS_FAVORITES";
export const ADD_TO_ADVICE_FAVORITES = "ADD_TO_ADVICE_FAVORITES";
export const ADD_TO_DAD_FAVORITES = "ADD_TO_DAD_FAVORITES";
export const ADD_TO_KANYE_FAVORITES = "ADD_TO_KANYE_FAVORITES";
export const FETCHING_KANYE_QUOTE = "FETCHING_KANYE_QUOTE";
export const FETCH_KANYE_QUOTE =  "FETCH_KANYE_QUOTE";
export const FETCHING_ANIMAL_FACT = "FETCHING_ANIMAL_FACT";
export const ADD_TO_ANIMAL_FAVORITES = "ADD_TO_ANIMAL_FAVORITES";
export const FETCH_ANIMAL_FACT = "FETCH_ANIMAL_FACT";

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

export const fetchNewDadJoke = (searchTerm) => {
  return dispatch => {
    dispatch(fetchingDadJoke())
    return fetchDadJoke(searchTerm)
      .then(joke => {
         if (searchTerm && joke.results.length === 0) {
         joke = {id: 'random', joke: `Sorry no results found for ${searchTerm}`, status: 200}
       } else if (searchTerm && joke.results) {
          const randomSelection = Math.floor(Math.random() * joke.results.length)
          joke = joke.results[randomSelection]
        }
        dispatch(getDadData(joke))
      })
  }
}

export const fetchNewKanyeQuote = () => {
  return dispatch  => {
    dispatch(fetchingKanyeQuote())
     return fetchKanyeQuote()
     .then(quote => {
       dispatch(getKanyeQuote(quote))
     })
    }
  }


export const fetchingKanyeQuote = () =>({
  type: FETCHING_KANYE_QUOTE
})

export const getKanyeQuote = (quote) => ({
  type: FETCH_KANYE_QUOTE,
  quote
})

export const addToKanyeFavorites = (quote) => ({
  type: ADD_TO_KANYE_FAVORITES,
  quote
})

export const getAnimalFact = (fact)=>({
  type:FETCH_ANIMAL_FACT,
  fact
})

export const addToAnimalFacts = (fact)=>({
  type: ADD_TO_ANIMAL_FAVORITES,
  fact
})

export const fetchingAnimalFact = () => ({
  type: FETCHING_ANIMAL_FACT
})

export const fetchNewAnimalFact = (animalType) => {
  return dispatch => {
    dispatch(fetchingAnimalFact())
    return fetchAnimalFact(animalType)
    .then(fact => {
      dispatch(getAnimalFact(fact))
    })
  }
}

export const getDadData = (data) => ({
  type: FETCH_DAD_JOKE,
  data: data
})

export const fetchNewLifeAdvice = (searchTerm) => {
  return dispatch => {
    dispatch(fetchingLifeAdvice())
    return fetchAdvice(searchTerm)
    .then(joke => {
      if (searchTerm && joke.message) {
        joke = {slip: {
          type: joke.message.type,
          advice: joke.message.text
        }}
      } else if (searchTerm && joke.slips) {
        const randomSelection = Math.floor(Math.random() * joke.slips.length)
        joke = {slip: {
          advice: joke.slips[randomSelection].advice,
          slip_id: joke.slips[randomSelection].slip_id
        }
      }
      }
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

export const addToGeekFavorites = (joke) => ({
  type: ADD_TO_GEEK_FAVORITES,
  newJoke: joke
})

export const addToDadFavorites = (joke) => ({
  type: ADD_TO_DAD_FAVORITES,
  newJoke: joke
})

export const addToAdviceFavorites = (advice) => ({
  type: ADD_TO_ADVICE_FAVORITES,
  advice: advice
})

export const addToCorporateFavorites = (joke) => ({
  type: ADD_TO_CORPORATEBS_FAVORITES,
  newJoke: joke
})

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
