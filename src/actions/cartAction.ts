import { ADD_TO_CART_FAIL, ADD_TO_CART_SUCCESS, REMOVE_CART_SUCCESS, UPDATE_QUANTITY_SIZE, GET_CART } from '../constants/action-types';
import Agent from '../services/agent';
import Storage from '../services/storage';

const cartIdAdded = Storage('cart-id');

export const addToCartSuccess = (response, shoeColorSizeId) => {
    return {
        type: ADD_TO_CART_SUCCESS,
        payload: {
            response,
            shoeColorSizeId
        }
    }
}

export const addToCartFail = (error) => {
    return {
        type: ADD_TO_CART_FAIL,
        payload: error
    }
}

export const getCart = (cart) => {
    return {
        type: GET_CART,
        payload: cart
    }
}

export const removeCartItemSuccess = (response) => {
    return {
        type: REMOVE_CART_SUCCESS,
        payload: response
    }
}

export const updateQtySize = (cartId, shoeColorSizeId, remainedQty) => {
    return {
        type: UPDATE_QUANTITY_SIZE,
        payload: {
            cartId,
            shoeColorSizeId,
            remainedQty
        }
    }
}


export const addToCart = (apiUrl, queries, shoeColorSizeId) => {
    return (dispatch) => {
        return Agent.Cart
            .add(apiUrl, queries)
            .then(data => {
                dispatch(addToCartSuccess(data, shoeColorSizeId))
                cartIdAdded.save(data.id);
            })
            .catch(error => {
                dispatch(addToCartFail(error))
            })
    }
}

export const removeCartItem = (apiUrl, params, queries) => {
    return (dispatch) => {
        return Agent.Cart
            .remove(apiUrl, params, queries)
            .then(data => {
                dispatch(removeCartItemSuccess(data))
            })
    }
}