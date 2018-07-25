import {ShoeSize} from "./shoe-sizes";
import {ShoeImage} from "./shoe-image";

export interface ShoeColor {
    code: string,
    name: string,
    slug: string,
    images: Array<ShoeImage>,
    sizes: Array<ShoeSize>
}
