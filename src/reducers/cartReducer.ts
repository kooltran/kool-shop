import { ADD_TO_CART_SUCCESS, REMOVE_CART_SUCCESS, UPDATE_QUANTITY_SIZE, GET_CART } from '../constants/action-types';
import update from 'immutability-helper';

const INITIALSTATE = {
    data: null,
    remainedProd: null,
    choosenSizeAdded: null
}

export default function cart(state = INITIALSTATE, action) {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                data: action.payload
            }
        case ADD_TO_CART_SUCCESS:
            const { response, shoeColorSizeId } = action.payload;
            const choosenSizeAdded = response.items.find(item => item.shoeColorSize.id === shoeColorSizeId)
            const remainedProd = choosenSizeAdded.shoeColorSize.quantity - choosenSizeAdded.quantity;
            // console.log(choosenSizeAdded, 'reducer')
            return {
                ...state,
                data: response,
                remainedProd,
                choosenSizeAdded
            }
        case REMOVE_CART_SUCCESS:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}