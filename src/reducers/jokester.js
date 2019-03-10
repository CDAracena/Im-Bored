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
  FETCH_LIFE_ADVICE_JOKE,
  ADD_TO_DAD_FAVORITES,
  ADD_TO_GEEK_FAVORITES,
  ADD_TO_ADVICE_FAVORITES,
  ADD_TO_CORPORATEBS_FAVORITES
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


// Might have to break up individual api reducers into seperate reducers to support object copies.
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
    const geekCopy = Object.assign({}, state.geekJoke, {
      fetching: true
    })
    return Object.assign({}, state, {
      geekJoke: geekCopy
    })
    case 'FETCH_GEEK_JOKE':
    const geekCopyJoke = Object.assign({}, state.geekJoke, {
      currentJoke: action.data,
      fetching: false
    })
    return Object.assign({}, state, {
      geekJoke: geekCopyJoke
    })
    case 'FETCHING_DAD_JOKE':
    const dadCopy = Object.assign({}, state.dadJoke, {
      fetching: true
    })
    return Object.assign({}, state, {
      dadJoke: dadCopy
    })
    case 'FETCH_DAD_JOKE':
    const dadCopyJoke = Object.assign({}, state.dadJoke, {
      currentJoke:action.data,
      fetching: false
    })
    return Object.assign({}, state, {
      dadJoke: dadCopyJoke
    })
    case 'FETCHING_CORPORATE_JOKE':
    const corporateCopy = Object.assign({}, state.corporateBS, {
      fetching: true
    })
    return Object.assign({}, state, {
      corporateBS: corporateCopy
    })
    case 'FETCH_CORPORATE_JOKE':
    const corporateCopyJoke = Object.assign({}, state.corporateBS, {
      currentJoke: action.data,
      fetching: false
    })
    return Object.assign({}, state, {
      corporateBS: corporateCopyJoke
    })
    case 'FETCHING_LIFE_ADVICE_JOKE':
    const lifeCopy = Object.assign({}, state.lifeAdvice, {
      fetching: true
    })
    return Object.assign({}, state, {
      lifeAdvice: lifeCopy
    })
    case 'FETCH_LIFE_ADVICE_JOKE':
    const adviceCopyJoke = Object.assign({}, state.lifeAdvice, {
      currentJoke: action.data,
      fetching: false
    })
    return Object.assign({}, state, {
      lifeAdvice: adviceCopyJoke
    })
    case 'ADD_TO_DAD_FAVORITES':
    const dadCollection = Object.assign({}, state.dadJoke, {
      collection: [...state.dadJoke.collection, action.newJoke]
    })
    return Object.assign({}, state, {
      dadJoke: dadCollection
    })
    case 'ADD_TO_GEEK_FAVORITES':
    const geekCollection = Object.assign({}, state.geekJoke, {
      collection: [...state.geekJoke.collection, action.newJoke]
    })
    return Object.assign({}, state, {
      geekJoke: geekCollection
    })
    case 'ADD_TO_ADVICE_FAVORITES':
    const adviceCollection = Object.assign({}, state.lifeAdvice, {
      collection: [...state.lifeAdvice.collection, action.advice]
    })
    return Object.assign({}, state, {
      lifeAdvice: adviceCollection
    })
    case 'ADD_TO_CORPORATEBS_FAVORITES':
    const corporateCollection = Object.assign({}, state.corporateBS, {
      collection: [...state.corporateBS.collection, action.newJoke]
    })
    return Object.assign({}, state, {
      corporateBS: corporateCollection
    })
    default:
    return state;
  }
}

export default jokester;
