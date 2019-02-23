import {
  OPEN_BOTTOM_DRAWER,
  CLOSE_BOTTOM_DRAWER,
  FETCHING_GEEK_JOKE,
  FETCHING_DAD_JOKE,
  FETCHING_CORPORATE_JOKE,
  FETCHING_LIFE_ADVICE_JOKE,
  FETCH_GEEK_JOKE,
  FETCH_DAD_JOKE,
  FETCH_CORPORATE_JOKE,
  FETCH_LIFE_ADVICE_JOKE
} from '../actions/bottomdrawer';

const initialState = {
  bottomDrawerOpen: false,
  geekJoke: {
    currentJoke: '',
    collection:[],
    fetching: false
  },
  corporateBS: {
    currentJoke:'',
    collection: [],
    fetching: false
  },
  lifeAdvice: {
    currentJoke: '',
    collection: [],
    fetching: false
  },
  dadJoke: {
    currentJoke: '',
    collection: [],
    fetching: false
  }
}

const jokester = (state=initialState, action) => {
  switch(action.type) {
    case 'OPEN_BOTTOM_DRAWER':
    return Object.assign({}, state, {
      bottomDrawerOpen: true
    });
    case 'CLOSE_BOTTOM_DRAWER':
    return Object.assign({}, state, {
      bottomDrawerOpen: false
    });
    case 'FETCHING_GEEK_JOKE':
    return Object.assign({}, state, {
      geekJoke: {
        fetching: true
      }
    })
    case 'FETCH_GEEK_JOKE':
    return Object.assign({}, state, {
      geekJoke: {
        currentJoke: action.data,
        fetching: false
      }
    })
    case 'FETCHING_DAD_JOKE':
    return Object.assign({}, state, {
      dadJoke: {fetching: true}
    })
    case 'FETCH_DAD_JOKE':
    return Object.assign({}, state, {
      dadJoke: {
        currentJoke: action.data,
        fetching: false
      }
    })
    case 'FETCHING_CORPORATE_JOKE':
    return Object.assign({}, state, {
      corporateBS: {
      fetching: true
      }
    })
    case 'FETCH_CORPORATE_JOKE':
    return Object.assign({}, state, {
      corporateBS: {
        currentJoke: action.data,
        fetching: false
      }
    })
    case 'FETCHING_LIFE_ADVICE_JOKE':
    return Object.assign({}, state, {
      lifeAdvice:{
      fetching: true
      }
    })
    case 'FETCH_LIFE_ADVICE_JOKE':
    return Object.assign({}, state, {
      lifeAdvice:{
      currentJoke: action.data,
      fetching: false
    }
    })
    default:
    return state;
  }
}

export default jokester;
