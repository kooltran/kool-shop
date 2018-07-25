import {Category} from "./category";
import {Brand} from "./brand";
import {ShoeColor} from "./shoe-color";

export interface Shoe {
    category: Category,
    brand: Brand,
    name: string,
    slug: string,
    price: number,
    description: string,
    shoeColors: Array<ShoeColor>,
    salesCount: number,
}
