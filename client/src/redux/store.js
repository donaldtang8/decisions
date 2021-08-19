import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import rootReducer from './reducers';

let middlewares = [thunk];

export const store = createStore(
  rootReducer,
  // applyMiddleware(...middlewares)
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
