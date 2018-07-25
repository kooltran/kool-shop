import { FETCH_PRODUCT_LIST_SUCCESS, FETCH_PRODUCT_LIST, FETCH_PRODUCT_LIST_FAIL } from '../constants/action-types';


const INITIAL_STATE = {
    data: {},
    isLoading: false,
    error: null
}

export default function prodList(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_PRODUCT_LIST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case FETCH_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null
            }
        case FETCH_PRODUCT_LIST_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}