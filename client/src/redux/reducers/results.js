import { 
    RESET_RESULTS,
    FETCH_RESULTS,
    GET_RESULTS,
    GET_RESULT,
    RESULTS_ERROR
 } from '../actions/types';

 const initialState = {
    results: [],
    total: 0,
    result: null,
    resultCategories: {},
    loading: false,
    errors: [],
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case RESET_RESULTS:
            return {
                ...state,
                results: [],
                total: 0,
                result: null,
                loading: false
            }
        case FETCH_RESULTS:
            return {
                ...state,
                loading: true
            }
        case GET_RESULTS:
            return {
                ...state,
                results: payload.results,
                total: payload.total,
                loading: false
            }
        case GET_RESULT:
            return {
                ...state,
                result: payload.result,
                loading: false
            }
        case RESULTS_ERROR:
            return {
                ...state,
                loading: false,
                errors: [...state.errors, payload]
            }
        default:
            return state;
    }
}