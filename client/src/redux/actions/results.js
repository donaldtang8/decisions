import axios from 'axios';
import { 
    RESET_RESULTS,
    GET_RESULTS,
    GET_RESULT,
    FETCH_RESULTS,
    RESULTS_ERROR
} from './types';
import { getCategories } from './categories';

import { getCategoriesFromResults } from './../../utils/resultsOperations';

const config = {
    headers: {
      'Content-Type': 'application/json'
    },
};

/**
 * @action    resetResults
 * @description Reset state
 **/
 export const resetResults = () => async (dispatch) => {
    dispatch({
      type: RESET_RESULTS
    })
}

/**
 * @action    getResultsByFilters
 * @description Retrieve a list of results given an object with params with embedded params of filters
 **/
 export const getResultsByFilters = (paramsData) => async (dispatch) => {
    try {
      const body = JSON.stringify(paramsData);
      dispatch({
        type: FETCH_RESULTS
      });
      const res = await axios.post('/api/yelp/business', body, config);
      // dispatch action to update posts if results are returned
      dispatch({
        type: GET_RESULTS,
        payload: {
          results: res.data.data,
          total: res.data.total
        },
      });
    } catch (err) {
      // dispatch error action type
      dispatch({
        type: RESULTS_ERROR,
      });
    }
  };