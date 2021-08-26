import { combineReducers } from 'redux';

import results from './results';
import categories from './categories';
import maps from './maps';

const rootReducer = combineReducers({
    results: results,
    categories: categories,
    maps: maps
});

export default rootReducer;
