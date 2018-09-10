import * as React from 'react';

interface RemoveCartItemProps {
    cartId: number,
    removeEnpoints: {
        url: string,
        params: {
            cart: string
        },
        queries: {
            cartItems: string
        }
    },
    cartItemId: number,
    shoeColorSizeId: number,
    onRemoveCartItem: Function,
    onClickShowModal: Function
}


interface RemoveCartItemState {
    cartId: number,
    cartItemId: number
}

export default class RemoveCartItem extends React.Component<RemoveCartItemProps, RemoveCartItemState> {
    constructor(props) {
        super(props);
    }
    
    handleShowConfirmModal = () => {
        const { shoeColorSizeId, cartItemId, onRemoveCartItem, onClickShowModal } = this.props;
        onRemoveCartItem(shoeColorSizeId, cartItemId);
        onClickShowModal(true);
        // console.log(document.getElementsByTagName('body'))
        // document.getElementsByTagName('body')[0].classList.add('fix-scroll')
    }

    render() {
        return (
            <div>
                <span className="remove-cartitem" onClick={this.handleShowConfirmModal}></span>
            </div>
        )
    }
}
