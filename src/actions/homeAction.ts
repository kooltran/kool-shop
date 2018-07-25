import { FETCH_INIT_HOME, FETCH_INIT_HOME_SUCCESS, FETCH_INIT_HOME_FAIL } from '../constants/action-types';
import Agent from '../services/agent';
import store from '../store/store';
import Storage from '../services/storage';
import { getCart } from './cartAction';

export const fetchInitDataRequest = () => {
	return {
		type: FETCH_INIT_HOME
	}
}

export const fetchInitDataSuccess = (response) => {
	return {
		type: FETCH_INIT_HOME_SUCCESS,
		payload: response
	}
}

export const fetchInitDataFail = error => {
	return {
		type: FETCH_INIT_HOME_FAIL,
		payload: error
	}
}

export const fetchInitData = () => {
	const cartId = Storage('cart-id');
	const cart = cartId.load();
	return function(dispatch) {
		return Agent.Init.initialize({cart})
			.then(res => {
				const { cart, ...dataInit } = res;
				dispatch(fetchInitDataSuccess(dataInit))
				dispatch(getCart(cart))
			})

			.catch(error => {
				dispatch(fetchInitDataFail(error))
			})
	}
}