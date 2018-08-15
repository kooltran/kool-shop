import * as React from 'react';
import { CartItem } from '../../interfaces/cart-item'

interface QtyInputProps {
    onChangeQtyInput: Function,
    onKeyPressInput: Function,
    quantity: number,
    cartItemId: number,
}

export default class QuantityInput extends React.Component<QtyInputProps, {}> {
    constructor(props) {
        super(props)
    }

    handleChangeQtyInput = (cartItemId: number, e: any) => {
        this.props.onChangeQtyInput(cartItemId, e)
    }

    render() {
        return (
            <input 
                className="input-qty"
                type="number" min="1"
                value={this.props.quantity}
                onChange={(e) => this.handleChangeQtyInput(this.props.cartItemId, e)}
            />
        )
    }
}