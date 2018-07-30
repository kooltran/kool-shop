import {CartItem} from './cart-item'

export interface Cart {
    totalQuantity: number,
    id: number,
    items: Array<CartItem>,
    price: number
}