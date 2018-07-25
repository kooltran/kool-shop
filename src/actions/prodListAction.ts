import { FETCH_PRODUCT_LIST_SUCCESS, FETCH_PRODUCT_LIST, FETCH_PRODUCT_LIST_FAIL } from '../constants/action-types';
import Agent from '../services/agent';
import store from '../store/store';

export const fetchProdListRequest = () => {
    return {
        type: FETCH_PRODUCT_LIST
    }
}

export const fetchProdListSuccess = (response) => {
    return {
        type: FETCH_PRODUCT_LIST_SUCCESS,
        payload: response
    }
}

export const fetchProdListFail = (error) => {
    return {
        type: FETCH_PRODUCT_LIST_FAIL,
        payload: error
    }
}


export const fetchProdList = (queries) => {
    return (dispatch) => {
        dispatch(fetchProdListRequest());
        return Agent.Cate
            .categories(queries)
            .then( data => dispatch(fetchProdListSuccess(data)) )
            .catch( error => dispatch(fetchProdListFail(error)) )
    }
}
