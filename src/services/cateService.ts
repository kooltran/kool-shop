import Agent from './agent'
import Storage from './storage';

let listeners: any = [];

const cartId = Storage('cart-id');

// TODO: check token

const cateService = {
	listCate: [],
	sections: [],
	cartInfo: null,
	endpoints: null,
	isLoading: true,
	isError: null,
	getCateInfo() {
		return {
			listCate: this.listCate,
			sections: this.sections,
			isError: this.isError,
			isLoading: this.isLoading,
		}
	},
	getEndpoints() {
		return this.endpoints;
	},
	getCartInfo() {
		return this.cartInfo;
	},
	initData() {
		const cart = cartId.load();
		Agent.Init.initialize({cart})
				.then((data) => {
					return (
						this.listCate = data.categories,
						this.sections = data.sections,
						this.isLoading = false,
						this.endpoints = data.endpoints,
						this.cartInfo = data.cart,
						this.notify()
					)
				})
	},
	getCart(cartDetailApiUrl, queries) {
		Agent.Cart.detail(cartDetailApiUrl, queries)
				.then(data => {
					return (
						this.cartInfo = data,
						this.notify()
					)
				})
	},
	removeCart(removeCartApiUrl, params, queries) {
		Agent.Cart.remove(removeCartApiUrl, params, queries)
				.then(data => {
					return (
						this.cartInfo = data,
						this.notify()
					)
				})
	},
	notify() {
        listeners.forEach((l:any) => {
            l();
        });
    },
	subscribe(listener: () => void) {
		listeners.push(listener);
	},
	unsubscribe(listener: any) {
		return listeners = listeners.filter((l: () => void) => l !== listener);
	},
};

export default cateService;

// https://github.com/quanla/pure-react-sample-realworld/blob/master/src/client/realworld-app/authen/user-info
// https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
