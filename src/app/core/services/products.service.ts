import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../interfaces/product";
import {environment} from "../../../environments/environment";
import * as moment from "moment";
import {Histories} from "../interfaces/histories";

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

  getQuarterlyRevenues(year: number, number: string, products: Product[]) {
    let quarterly = 0;
    products.map(p => {
      p.histories.map(history => {
        let created_at = moment(history.created_at);
        if (created_at.year() === year) {
          if (history.type === 'retrait-par-vente') {
            switch (number) {
              case '1':
                if (created_at.month() === 0 || created_at.month() === 1 || created_at.month() === 2) {
                  quarterly += history.price * history.quantity;
                }
                break;
              case '2':
                if (created_at.month() === 3 || created_at.month() === 4 || created_at.month() === 5) {
                  quarterly += history.price * history.quantity;
                }
                break;
              case '3':
                if (created_at.month() === 6 || created_at.month() === 7 || created_at.month() === 8) {
                  quarterly += history.price * history.quantity;
                }
                break;
              case '4':
                if (created_at.month() === 9 || created_at.month() === 10 || created_at.month() === 11) {
                  quarterly += history.price * history.quantity;
                }
                break;
            }
          }
        }
      })
    })
    return quarterly + " €"
  }

  getMonthlyRevenues(year: number, month: any, products: Product[]) {
    let monthly = 0;
    products.map(p => {
      p.histories.map(history => {
        let created_at = moment(history.created_at);
        if (created_at.year() === year) {
          if (history.type === 'retrait-par-vente') {
            if (month.toLowerCase() === created_at.format('MMMM')) {
              monthly += history.price * history.quantity;
            }
          }
        }
      });
    });
    return monthly + " €";
  }

  getAccountingResults(products: Product[], year: number = moment().year()) {
    let purchase_expense = 0;
    products.map(p => {
      p.histories.map(h => {
        let created_at = moment(h.created_at);
        if (created_at.year() === year) {
          purchase_expense += p.price_on_purchase * h.quantity;
        }
      })
    })
    return this.getTurnover(products, year) - purchase_expense;
  }

  getYears(products: Product[]) {
    let years: number[] = [];
    products.map(p => {
      p.histories.map(history => {
        if (history.type === 'retrait-par-vente') {
          let created_at = moment(history.created_at);
          years.push(created_at.year());
        }
      })
    })
    return [...new Set(years)];
  }

  private getTurnover(products: Product[], year = moment().year()) {
    let turnoverGlobal = 0;
    products.map(p => {
      p.histories.map(history => {
        let created_at = moment(history.created_at);
        if (created_at.year() === year) {
          if (history.type === 'retrait-par-vente') {
            turnoverGlobal += history.price * history.quantity;
          }
        }
      })
    })
    return turnoverGlobal;
  }
}
