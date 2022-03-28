import {Histories} from "./histories";

export interface Product {
    comments: string,
    category: number,
    availability: boolean,
    id: number,
    price: number,
    price_on_sale: number,
    discount: number,
    sale: boolean,
    owner: string,
    unit: string,
    name: string,
    quantity_stock: number,
    quantity_sold: number,
    histories: Histories[],
    price_on_purchase: number
}
