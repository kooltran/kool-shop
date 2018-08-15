import * as React from 'react';
import { removeCartItem } from '../../actions/cartAction';
import { connect } from 'react-redux';
import Modal from '../../components/Modal/modal';


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
    removeCartItem: Function
}


interface RemoveCartItemState {
    show: boolean
}

class RemoveCartItem extends React.Component<RemoveCartItemProps, RemoveCartItemState> {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    removeCartItem = () => {
        const { cartId, removeEnpoints, cartItemId, shoeColorSizeId, removeCartItem } = this.props;
        const {url, params, queries} = removeEnpoints;
		const paramsObj = {}
		const queriesObj = {}
		paramsObj[params.cart] = cartId;
        queriesObj[queries.cartItems] = cartItemId;
        removeCartItem(url, paramsObj, queriesObj, shoeColorSizeId);
	}

    render() {
        return (
            <div>
                <span className="remove-cartitem" onClick={() => this.setState({ show: true })}></span>
                <Modal 
                    show={this.state.show}
                    removeCartItem={this.removeCartItem}
                />
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
	return {
		removeCartItem: (apiUrl, params, queries, shoeColorSizeId) => dispatch(removeCartItem(apiUrl, params, queries, shoeColorSizeId))
	}
}

export default connect(null, mapDispatchToProps)(RemoveCartItem);
