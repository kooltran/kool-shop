import { FETCH_PRODUCT_DETAIL, FETCH_PRODUCT_DETAIL_SUCCESS, FETCH_PRODUCT_DETAIL_FAIL } from '../constants/action-types';

const INITIAL_STATE = {
    data: {},
    isLoading: false,
    error: null
}

export default function prodDetail(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_PRODUCT_DETAIL:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case FETCH_PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null
            }
        case FETCH_PRODUCT_DETAIL_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}