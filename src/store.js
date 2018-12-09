import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import reducer from './reducers/reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))

export default store;
