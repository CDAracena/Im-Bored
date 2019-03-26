import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import core from './reducers/core';
import suggestion from './reducers/suggestions'
import jokester from './reducers/jokester'
import token from './reducers/token';

const rootReducer = combineReducers({
  core,
  suggestion,
  jokester,
  token
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;
