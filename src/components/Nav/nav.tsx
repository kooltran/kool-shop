import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Category } from '../../interfaces/category';
import { fetchInitData } from '../../actions/homeAction';
import RemoveCartItem from '../../components/Cart/remove-cartItem';
import { Cart } from '../../Interfaces/cart';
import { Endpoints } from '../../Interfaces/endpoints';
import './Nav.scss';

import * as Logo from '../../assets/images/logo.png'
import { setTimeout } from 'timers';
import {Modal} from 'react-bootstrap';

interface NavProps {
	categories: Category,
	removeCartItem: Function,
	fetchInitData: Function,
	cart: Cart,
	endpoints: Endpoints,
	isCartAdded: boolean,
}

interface NavStates {
	showMiniCart: boolean,
	isShowMiniCart: boolean
}


class Nav extends React.Component<NavProps, NavStates> {
	constructor(props: object) {
		super(props);

		this.state = {
			isShowMiniCart: false,
		}
	}

	componentDidMount() {
		this.props.fetchInitData();
	}

	componentWillReceiveProps(props) {
		if (props.isCartAdded) {
			this.setState({ isShowMiniCart: true })
			setTimeout(() => {
				this.setState({ isShowMiniCart: false })
			}, 1000)
		} else {
			this.setState({ isShowMiniCart: false })
		}
	}

	renderSubMenuItem(cate) {
		return cate.children.map(child => {
			return (
				<li key={child.slug} className="menu-item">
					<Link className="menu-link" to={`/category/${child.slug}`} onClick={this.removeSlideMobileMenu}>{child.name}</Link>
				</li>
			)
		})
	}

	removeSlideMobileMenu = () => {
		const parentBody = document.getElementsByTagName('body');
		parentBody[0].classList.remove('slide-menu-mb');
	}

	openSubMobileMenu  = (e: any) => {
		const parent = e.target.parentNode;
		parent.classList.add('slide-submenu-mb')
	}

	backSubmenuMobile = (e: any) => {
		const parentLI  = e.target.closest('li');
		parentLI.classList.remove('slide-submenu-mb');
	}

	renderCategoriesItem() {
		const { categories } = this.props;
		if (categories) {
			return categories.map((cate, index) => (
				<li key={index} className="nav__item">
					<Link className="nav__item--link" to={`/category/${cate.slug}`} onClick={this.removeSlideMobileMenu}>{cate.name}</Link>
					<span className="btn-sub-menu" onClick={this.openSubMobileMenu}></span>
					<div className="submenu-wrapper">
						<ul className="submenu-content">
							<div className="submenu-title d-md-none">
								{cate.name}
								<span className="btn-back-submenu" onClick={this.backSubmenuMobile}></span>
							</div>
							{this.renderSubMenuItem(cate)}
						</ul>
					</div>
				</li>
			))
		}
	}

	toggleMobileMenu = () => {
		const bodyElement = document.getElementsByTagName('body');
		if (bodyElement[0].classList.contains('slide-menu-mb')) {
			bodyElement[0].classList.remove('slide-menu-mb')
		} else {
			bodyElement[0].classList.add('slide-menu-mb')
		}
	}

	renderMiniCartContent(cartInfo: Cart) {
		const { isShowMiniCart } = this.state;
		if (cartInfo.totalQuantity !== 0) {
			return (
				<div className={`mini__cart ${isShowMiniCart ? 'show-mini-cart' : ''}`}>
					<ul className="mini__cart--wrapper">
						{
							cartInfo &&  cartInfo.items.map((item, index) => {
								return (
									<li key={index} className="cart-item">
										<div className="prod-image">
											<img src={item.image} alt=""/>
										</div>
										<div className="prod-content">
											<Link to="" className="prod-name">{item.name}</Link>
											<ul className="prod-content">
												<li>
													<span className="prod-label">SIZE: </span>
													<span className="prod-info">{item.size}</span>
												</li>
												<li>
													<span className="prod-label">QUANTITY: </span>
													<span className="prod-info">{item.quantity}</span>
												</li>
												<li>
													<span className="prod-label">PRICE: </span>
													<span className="prod-info">{item.totalPrice}$</span>
												</li>
											</ul>
										</div>
										<RemoveCartItem
											removeEnpoints={this.props.endpoints.carts.remove}
											cartItemId={item.id}
											cartId={cartInfo.id}
											shoeColorSizeId={item.shoeColorSize.id}
										/>
									</li>
								)
							})
						}
					</ul>
					<div className="mini__cart--totalprice">
						<span className="prod-label">TOTAL PRICE: </span>
						<span className="prod-totalprice">{cartInfo.price}$</span>
					</div>
					<div className="mini__cart--button">
						<Link to="/cart" className="btn-cart-view">VIEW CART</Link>
						<Link to="/" className="btn-cart-checkout">GO TO CHECKOUT</Link>
					</div>
				</div>
			)
		} else {
			return (
				<div className="mini__cart">
					<h5 className="cart-empty">YOUR CART IS EMPTY</h5>
				</div>
			)
		}
	}

	render() {
		const { cart } = this.props;
		return (
			<div className="nav__wrapper">
				<div className="container">
					<button className="nav__burger btn-buger d-md-none" type="button" onClick={this.toggleMobileMenu}>
						<span className="burger-line"></span>
						<span className="burger-line"></span>
						<span className="burger-line"></span>
					</button>
					<div className="nav__logo">
						<Link className="logo-wrapper" to="/">
							<img className="nav__logo--img" src={Logo} alt="logo" />
						</Link>
					</div>
					<div className="mb-menu-mask" onClick={this.toggleMobileMenu}></div>
					<ul className="nav__menu">
						{this.renderCategoriesItem()}
					</ul>
					<div className="nav__cart">
						<span className="cart-icon"></span>
						<span className="cart-qty">{cart && cart.totalQuantity}</span>
						{ cart && this.renderMiniCartContent(cart) }
					</div>
				</div>
			</div>
		);
	}
};



const mapStateToProps = (state) => {
	return {
		categories: state.initHome.data.categories,
		endpoints: state.initHome.data.endpoints,
		cart: state.cart.data,
		isCartAdded: state.cart.isCartAdded
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchInitData: () => dispatch(fetchInitData()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
