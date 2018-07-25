import {CollectionQueries} from "./collection-queries";

export interface Collection {
    count: number,
    total: number,
    totalPages: number,
    currentPage: number,
    queries: CollectionQueries
}
