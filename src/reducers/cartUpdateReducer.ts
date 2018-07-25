import { UPDATE_QUANTITY_SIZE } from '../constants/action-types';

export default function cartUpdate(state = {}, action) {
    switch (action.type) {
        case UPDATE_QUANTITY_SIZE:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}