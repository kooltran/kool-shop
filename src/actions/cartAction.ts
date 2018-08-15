import { ADD_TO_CART_FAIL, ADD_TO_CART_SUCCESS, REMOVE_CART_SUCCESS, GET_CART, UPDATE_CART_QUANTITY_SUCCESS, UPDATE_CART_QUANTITY } from '../constants/action-types';
import Agent from '../services/agent';
import Storage from '../services/storage';

const cartIdAdded = Storage('cart-id');

export const addToCartSuccess = (cartItemAdded, shoeColorSizeId) => {
    return {
        type: ADD_TO_CART_SUCCESS,
        payload: {
            cartItemAdded,
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

export const removeCartItemSuccess = (cartItemRemoved, shoeColorSizeIdRemoved) => {
    return {
        type: REMOVE_CART_SUCCESS,
        payload: {
            cartItemRemoved,
            shoeColorSizeIdRemoved
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

export const removeCartItem = (apiUrl, params, queries, shoeColorSizeId) => {
    return (dispatch) => {
        return Agent.Cart
            .remove(apiUrl, params, queries)
            .then(data => {
                dispatch(removeCartItemSuccess(data, shoeColorSizeId))
            })
    }
}

export const updateCartQtySuccess = (cartUpdated) => {
    return {
        type: UPDATE_CART_QUANTITY_SUCCESS,
        payload: cartUpdated
    }
}

export const updateCartQty = (apiUrl, params, queries) => {
    return (dispatch) => {
        return Agent.Cart
            .update(apiUrl, params, queries)
            .then(data => {
                dispatch(updateCartQtySuccess(data))
            })
    }
}