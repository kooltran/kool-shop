export interface Endpoints {
    carts: {
        add: {
            url: string,
            queries: {
                cart: string,
                shoeColorSizeId: number,
                quantity: number
            }
        }
    }
}