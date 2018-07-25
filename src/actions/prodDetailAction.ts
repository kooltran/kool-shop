import { FETCH_PRODUCT_DETAIL, FETCH_PRODUCT_DETAIL_SUCCESS, FETCH_PRODUCT_DETAIL_FAIL } from '../constants/action-types';
import Agent from '../services/agent';

export const fetchProdDetailRequest = () => {
    return {
        type: FETCH_PRODUCT_DETAIL
    }
}

export const fetchProdDetailSuccess = (response) => {
    return {
        type: FETCH_PRODUCT_DETAIL_SUCCESS,
        payload: response
    }
}

export const fetchProdDetailFail = (error) => {
    return {
        type: FETCH_PRODUCT_DETAIL_FAIL,
        payload: error
    }
}

export const fetchProdDetail = (name) => {
    return (dispatch) => {
        dispatch(fetchProdDetailRequest());
        return Agent.Detail
            .detail(name)
            .then( data => {
                dispatch(fetchProdDetailSuccess(data))
            })
            .catch( error => dispatch(fetchProdDetailFail(error)) )
    }
}