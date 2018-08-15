export interface Endpoints {
    carts: {
        add: {
            url: string,
            queries: {
                cart: string,
                shoeColorSizeId: number,
                quantity: number
            }
        },
        remove: {
            url: string,
            params: {
                cart: string
            },
            queries: {
                cartItems: string
            }
        },
        update: {
            url: string,
            params: {
                cart: string
            },
            queries: {
                cartItems: string
            }
        }
    }
}