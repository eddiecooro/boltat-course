import { createStore, compose, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { createStateSyncMiddleware } from 'redux-state-sync';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  persistState('todos'),
  applyMiddleware(thunk, createStateSyncMiddleware())
);

const store = createStore(rootReducer, enhancer);

export default store;
