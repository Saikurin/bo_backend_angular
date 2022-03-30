import {Product} from "./product";

export interface Histories {
    id?: number,
    created_at: Date,
    product: Product,
    quantity: number,
    type: string,
    price: number
}
