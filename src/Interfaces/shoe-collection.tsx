import {Collection} from "./collection";
import {Shoe} from "./shoe";

export interface ShoeCollection extends Collection {
    items: Array<Shoe>
}
