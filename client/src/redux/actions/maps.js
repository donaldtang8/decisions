import { 
    RESET_MAPS,
    FOCUS_MARKER
} from './types';

/**
 * @action    resetMaps
 * @description Reset maps reducer
 **/
 export const resetMaps = () => async (dispatch) => {
    dispatch({
      type: RESET_MAPS
    })
}

/**
 * @action    focusMarkerOnMap
 * @description Set selected marker property in maps reducer to hovered result
 **/
 export const focusMarkerOnMap = (selectedResult) => (dispatch) => {
      dispatch({
        type: FOCUS_MARKER,
        payload: selectedResult
      });
  };