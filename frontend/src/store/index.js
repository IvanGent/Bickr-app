import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import photoReducer from './photos';
import commentReducer from './comments';
import albumReducer from './album';

const rootReducer = combineReducers({
  session: sessionReducer,
  photo: photoReducer,
  comments: commentReducer,
  album: albumReducer,
})

let enhancer;

if(process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;