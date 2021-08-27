import { 
    RESET_PAGINATION,
    SET_PAGE,
    SET_OFFSET,
    SET_PERPAGE
} from "../actions/types";

const initialState = {
    page: 0,
    offset: 0,
    perPage: 10
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case RESET_PAGINATION:
            return {
                ...state,
                page: 0,
                offset: 0
            }
        case SET_PAGE:
            return {
                ...state,
                page: payload
            }
        case SET_OFFSET:
            return {
                ...state,
                offset: payload
            }
        case SET_PERPAGE:
            return {
                ...state,
                perPage: payload
            }
        default:
            return state;
    }
}