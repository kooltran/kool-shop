import * as queryString    from "query-string";
import AppRouter from '../AppRouter/app-router';
import cateService from './cateService';

const baseURL = 'http://shoppy.khoahuy.com';

interface RequestParams {
	url: string,
	body: any,
	username: string,
	email: string,
	password: string,
	passwordConfirm: string
}

const { fetch } = window;

const request = {
	get: (url: RequestParams) => {
		return fetch(url, {
			method: 'get',
		})
		.then(res => res.json())
	},
	post: ({url, body}: RequestParams) => fetch(baseURL + url, {
		method: 'post',
		body: JSON.stringify(body),
	})
};


// https://css-tricks.com/importance-javascript-abstractions-working-remote-data/
// https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript


const Init = {
	initialize: (queries: object) => request.get(getUrl(AppRouter.api.init.path, {}, queries))
}

const Cate = {
	categories: (queries: object) => request.get(getUrl(AppRouter.api.list.path, {}, queries))
}

const Detail = {
	detail: (name: string) => request.get(getUrl(AppRouter.api.detail.path, {'name': name}))
}

const Cart = {
	add: (apiUrl, queries: object) => request.get(getUrl(apiUrl, {}, queries)),
	detail: (apiUrl: string, params: object) => request.get(getUrl(apiUrl, params)),
	remove: (apiUrl: string, params: object, queries: object) => request.get(getUrl(apiUrl, params, queries))
}



const getUrl = (inputUrl :string, params :{[key: string]: string} = {}, queries :{[key: string] :string} = {}) => {
    let url = inputUrl;
    if (Object.keys(params).length > 0) {
        for (let key in params) {
            url = url.replace(key+'?', key).replace(':'+key, params[key]);
        }
    }
    if (Object.keys(queries).length > 0) {
        url += '?' + queryString.stringify(queries);
    }

    return url;
}

export default {
	Init,
	Cate,
	Detail,
	Cart
};

// https://github.com/gothinkster/react-redux-realworld-example-app/blob/master/src/agent.js
