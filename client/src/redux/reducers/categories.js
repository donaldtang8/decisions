import { RESET_CATEGORIES, GET_CATEGORIES } from "./../actions/types";

const initialState = {
    categories: []
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case RESET_CATEGORIES:
            return {
                ...state,
                categories: []
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
        default:
            return state;
    }
}