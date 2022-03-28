import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../../core/services/products.service";
import {Product} from "../../../core/interfaces/product";
import * as moment from "moment";

@Component({
    selector: 'app-history-results',
    templateUrl: './history-results.component.html',
    styleUrls: ['./history-results.component.css']
})
export class HistoryResultsComponent implements OnInit {

    accounting_result = 0;
    societies_taxes: number = 0;
    private selectedYear: any;
    private products: Product[] = [];

    constructor(private productsService: ProductsService) {
    }

    ngOnInit(): void {
        this.productsService.getProducts().subscribe({
            next: (products) => {
                this.products = products;
                this.getAccountingService(moment().year(), products)
            }, error: (err) => console.error(err)
        });
    }

    selectYear($event: any) {
        this.selectedYear = $event;
        this.getAccountingService($event, this.products);
    }

    getCurrentYear() {
        return moment().year();
    }

    getAllYearsProducts() {
        return this.productsService.getYears(this.products);
    }

    private getAccountingService(year: number, products: Product[]) {
        this.accounting_result = this.productsService.getAccountingResults(products, year);
        this.societies_taxes = this.accounting_result * 0.7;
    }
}
