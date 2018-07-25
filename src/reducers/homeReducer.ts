import { FETCH_INIT_HOME, FETCH_INIT_HOME_SUCCESS, FETCH_PRODUCT_LIST_FAIL } from '../constants/action-types';

const INITIAL_STATE = {
    data: {},
    isLoading: true,
    error: null
}

export default function initHome(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_INIT_HOME_SUCCESS:
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

