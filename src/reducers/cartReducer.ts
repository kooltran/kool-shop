import { ADD_TO_CART_SUCCESS, REMOVE_CART_SUCCESS, UPDATE_QUANTITY_SIZE, GET_CART } from '../constants/action-types';

const INITIALSTATE = {
    data: null,
    remainedProd: null,
    shoeColorSizeId: null
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
                shoeColorSizeId
            }
        case REMOVE_CART_SUCCESS:
            const { cartItemRemoved, shoeColorSizeIdRemoved } = action.payload;
            return {
                ...state,
                data: cartItemRemoved,
                shoeColorSizeId: shoeColorSizeIdRemoved
            }
        default:
            return state;
    }
}