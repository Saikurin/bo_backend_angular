import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../interfaces/product";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) {
    }

    getProducts() {
        return this.http.get<Product[]>(environment.api_url + "/products/");
    }

    getProductById(id: number) {
        return this.http.get<Product>(environment.api_url + "/products/" + id + "/");
    }

    updateInventory(action: string, stock: number, product: Product) {
        switch (action) {
            case 'add':
                product.quantity_stock += stock;
                break;
            case 'remove':
                product.quantity_stock -= stock;
                product.quantity_sold += stock;
                break;
        }

        return this.http.put<Product>(environment.api_url + "/products/" + product.id + "/", product);
    }

    updatePercentage(product: Product, percentage: number) {
        product.price_on_sale = percentage;
        return this.http.put<Product>(environment.api_url + "/products/" + product.id + "/", product);
    }

    updateMassive(products: Product[]) {
        return this.http.post(environment.api_url + "/products/update_inventories/", products);
    }
}
