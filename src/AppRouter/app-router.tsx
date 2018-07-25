const apiUrl = 'http://shoppy.khoahuy.com';

const AppRouter = {
    api: {
        init: {path: apiUrl + '/init'},
        list: {path: apiUrl + '/products'},
        detail: {
            path: apiUrl + '/products/:name',
            params: {
                item: 'shoe'
            }
        },
        cart: {
            add: {
                path: apiUrl + '/carts/add'
            },
            detail: {
                path: apiUrl + '/carts/:cart'
            }
        }
    },
    routes: {
        home: {
            path: '/'
        },
        list: {
            path: '/list/:category?',
            params: {category: 'category'}
        },
        detail: {
            path: '/detail/:shoe',
            params: {item: 'shoe'}
        },
    },
};

export default AppRouter;