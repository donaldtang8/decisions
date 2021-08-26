import { 
    RESET_MAPS,
    FOCUS_MARKER
 } from '../actions/types';

 const initialState = {
    selectedMarker: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case RESET_MAPS:
            return {
                ...state,
                selectedMarker: null
            }
        case FOCUS_MARKER:
            return {
                ...state,
                selectedMarker: payload
            }
        default:
            return state;
    }
}