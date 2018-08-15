import * as React from 'react';
import { connect } from 'react-redux';
import './cart.scss';
import { Link } from 'react-router-dom';
import QuantityInput from './quantityInput';
import { updateCartQty } from '../../actions/cartAction';
import LoadingSpinner from '../../components/Loading';
import RemoveCartItem from '../../components/Cart/remove-cartItem';
import { Endpoints } from '../../Interfaces/endpoints';

import { Cart } from '../../interfaces/cart';

interface CartViewProps {
    cart: Cart,
    updateCartQty: Function,
    endpoints: Endpoints
}

interface CartViewState {
    quantity: object,
    cartItemId: number,
    errorMessage: object
}

class CartView extends React.Component<CartViewProps, CartViewState> {
    constructor(props) {
        super(props);
        this.state = {
            quantity: {},
            cartItemId: null,
            errorMessage: {}
        }
    }


    onChangeQtyInput = (cartItemId: number, e: any) => {
        const { value } = e.target;
        this.setState({
            quantity: {
                ...this.state.quantity, [cartItemId]: value
            },
            cartItemId: cartItemId,
        })
    }

    onUpdateQuantity = (e: any) => {
        e.preventDefault()
        const { quantity, cartItemId } = this.state;
        const { cart } = this.props;
        const updatedQty = quantity[cartItemId];
        const { url, params, queries } = this.props.endpoints.carts.update;
        const paramsObj = {};
        const queriesObj = {};
        const choosenCartItem = cart.items.find(item =>  item.id === cartItemId);
        const totalQuantity = choosenCartItem.shoeColorSize.quantity;
        paramsObj[params.cart] = cart.id;
        paramsObj[params.cartItem] = cartItemId;
        queriesObj[queries.quantity] = updatedQty;
        if (updatedQty > totalQuantity) {
            this.setState({
                errorMessage: {
                    ...this.state.errorMessage, [cartItemId]: `This Product only has ${totalQuantity} products`
                },
                quantity: {
                    ...this.state.quantity, [cartItemId]: totalQuantity
                }
            })
        } else {
            this.props.updateCartQty(url, paramsObj, queriesObj)
            this.setState({
                errorMessage: {
                    ...this.state.errorMessage, [cartItemId]: ''
                },
                quantity: {}
            })
        }
    }

    renderCartItemList() {
        const { cart endpoints } = this.props;
        const { quantity, errorMessage } = this.state;
        if (cart) {
            return cart.items.map((item, index) => {
                return (
                    <tr key={index} className="cart-item">
                        <td className="prod-image">
                            <img src={item.image} />
                        </td>
                        <td className="prod-info">
                            <Link to="" className="name">{item.name}</Link>
                            <p className="size">Size: {item.size}</p>
                        </td>
                        <td className="prod-quantity">
                            <form onSubmit={this.onUpdateQuantity}>
                                <QuantityInput
                                    quantity={ quantity[item.id] === '' ? '' : quantity[item.id] || item.quantity }
                                    cartItemId={item.id}
                                    onChangeQtyInput={this.onChangeQtyInput}
                                />
                                <button className="update-cart" disabled={(quantity[item.id] && quantity[item.id] !== '0') ? false : true}></button>
                            </form>
                            <p className="show-error">{errorMessage[item.id] || ''}</p>
                        </td>
                        <td className="prod-price">{item.price}</td>
                        <td className="prod-totalprice">{item.totalPrice}</td>
                        <td className="prod-remove">
                            <RemoveCartItem
                                removeEnpoints={endpoints.carts.remove}
                                cartItemId={item.id}
                                cartId={cart.id}
                                shoeColorSizeId={item.shoeColorSize.id}
                            />
                        </td>
                    </tr>
                )
            })
        }
    }

    render() {
        const { cart } = this.props;
        if (cart) {
            if (cart.items.length > 0) {
                return (
                    <div className="cart-wrapper">
                        <div className="container">
                            <h2 className="cart-title">Your shopping cart</h2>
                            <div className="cart-content">
                                <table className="table cart-table">
                                    <thead>
                                        <tr>
                                            <th scope="col" colSpan={2}>ITEMS</th>
                                            <th scope="col">QUANTITY</th>
                                            <th scope="col">PRICE</th>
                                            <th scope="col">SUBTOTAL</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.renderCartItemList()}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="cart-wrapper">
                        <div className="container">
                            <h2 className="cart-title">Your shopping cart is empty</h2>
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <div className="cart-wrapper">
                    <LoadingSpinner/>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
	return {
        cart: state.cart.data,
        endpoints: state.initHome.data.endpoints,
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCartQty: (apiUrl, params, queries) => dispatch(updateCartQty(apiUrl, params, queries))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartView);