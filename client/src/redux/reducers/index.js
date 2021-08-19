import { combineReducers } from 'redux';

import results from './results';
import categories from './categories';

const rootReducer = combineReducers({
    results: results,
    categories: categories
});

export default rootReducer;
