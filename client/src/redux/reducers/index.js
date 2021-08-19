import { combineReducers } from 'redux';

import results from './results';

const rootReducer = combineReducers({
    results: results
});

export default rootReducer;
