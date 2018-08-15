import { ADD_TO_CART_SUCCESS, REMOVE_CART_SUCCESS, UPDATE_CART_QUANTITY_SUCCESS, GET_CART } from '../constants/action-types';

const INITIALSTATE = {
    data: null,
    remainedProd: null,
    shoeColorSizeId: null,
    isCartAdded: false
}

export default function cart(state = INITIALSTATE, action) {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                data: action.payload
            }
        case ADD_TO_CART_SUCCESS:
            const { cartItemAdded, shoeColorSizeId } = action.payload;
            const choosenSizeAdded = cartItemAdded.items.find(item => item.shoeColorSize.id === shoeColorSizeId)
            const remainedProd = choosenSizeAdded.shoeColorSize.quantity - choosenSizeAdded.quantity;
            return {
                ...state,
                data: cartItemAdded,
                remainedProd,
                shoeColorSizeId,
                isCartAdded: true
            }
        case REMOVE_CART_SUCCESS:
            const { cartItemRemoved, shoeColorSizeIdRemoved } = action.payload;
            return {
                ...state,
                data: cartItemRemoved,
                shoeColorSizeId: shoeColorSizeIdRemoved,
                isCartAdded: false
            }
        case UPDATE_CART_QUANTITY_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isCartAdded: false
            }
        default:
            return state;
    }
}