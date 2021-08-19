import { RESET_CATEGORIES, GET_CATEGORIES } from "./types";

/**
 * @action    resetCategories
 * @description Reset state
 **/
 export const resetCategories = () => async (dispatch) => {
    dispatch({
      type: RESET_CATEGORIES
    })
}

/**
 * @action    getCategories
 * @description Get categories
 **/
 export const getCategories = (categories) => async (dispatch) => {
    dispatch({
      type: GET_CATEGORIES,
      payload: categories
    })
}

