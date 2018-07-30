export interface CartItem {
    totalPrice: number,
    id: number,
    shoeColorSize: {
        id: number,
        size: number,
        quantity: number
    },
    name: string,
    size: number,
    quantity: number,
    price: number,
    image: string
}