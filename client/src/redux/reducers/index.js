import { combineReducers } from 'redux';

import results from './results';
import categories from './categories';
import maps from './maps';
import pagination from './pagination';

const rootReducer = combineReducers({
    results: results,
    categories: categories,
    maps: maps,
    pagination: pagination
});

export default rootReducer;
