import { 
    RESET_PAGINATION,
    SET_PAGE,
    SET_OFFSET,
    SET_PERPAGE
} from './types';

/**
 * @action    resetPagination
 * @description Reset pagination reducer
 **/
 export const resetMaps = () => async (dispatch) => {
    dispatch({
      type: RESET_PAGINATION
    })
}

/**
 * @action    setPage
 * @description Set page property in pagination reducer
 **/
 export const setPage = (page) => (dispatch) => {
      dispatch({
        type: SET_PAGE,
        payload: page
      });
};

/**
 * @action    setOffset
 * @description Set offset property in pagination reducer
 **/
 export const setOffset = (offset) => (dispatch) => {
    dispatch({
      type: SET_OFFSET,
      payload: offset
    });
};

/**
 * @action    setPerPage
 * @description Set per page property in pagination reducer
 **/
 export const setPerPage = (perPage) => (dispatch) => {
    dispatch({
      type: SET_PERPAGE,
      payload: perPage
    });
};
