import {Component, OnInit} from '@angular/core';
import {Product} from "../../../core/interfaces/product";
import {ProductsService} from "../../../core/services/products.service";
import * as moment from "moment";

@Component({
    selector: 'app-history-turnover',
    templateUrl: './history-turnover.component.html',
    styleUrls: ['./history-turnover.component.css']
})
export class HistoryTurnoverComponent implements OnInit {

    products: Product[] = [];
    turnover: string = "";
    dataTurnover: Array<{ name: string; series: { name: string; value: number; }[]; }> | undefined;
    months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
    dataTurnoverReady: boolean = false;
    quarterlyRevenues: string = "_ €";
    selectedYear: number = this.getCurrentYear();
    monthlyRevenues: string = "_ €";

    constructor(private productService: ProductsService) {
        moment.locale('fr');
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: (products) => {
                this.products = products;
                this.getTurnover();
                this.onSelectQuarterly("1");
                this.onSelectMonth(this.getCurrentMonth());
            }, error: (err) => console.error(err)
        });
    }

    getTurnover(year = this.getCurrentYear()) {
        this.dataTurnoverReady = false;
        this.initializeDataForNgx();
        let turnoverGlobal = 0;
        this.products.map(p => {
            let turnover = 0;
            p.histories.map(history => {
                let created_at = moment(history.created_at);
                if (created_at.year() === year) {
                    if (history.type === 'retrait-par-vente') {
                        turnover = p.price * history.quantity;
                        turnoverGlobal += p.price * history.quantity;
                        if (this.dataTurnover) {
                            let index = this.dataTurnover[0].series.findIndex(serie => {
                                return serie.name.toLowerCase() === created_at.format('MMMM').toLowerCase();
                            });
                            this.dataTurnover[0].series[index].value += turnover;
                        }
                    }
                }
            })
        })
        this.turnover = this.numberWithSpaces(turnoverGlobal);
        this.dataTurnoverReady = true;
    }

    getAllYearsProducts() {
        return this.productService.getYears(this.products);
    }

    numberWithSpaces(x: number) {
        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

    getCurrentYear() {
        return moment().year();
    }

    selectYear($event: any) {
        this.selectedYear = $event;
        this.getTurnover($event);
    }

    initializeDataForNgx() {
        this.dataTurnover = [{
            "name": "Ventes", "series": []
        }];
        this.months.map(m => {
            if (this.dataTurnover) {
                this.dataTurnover[0].series.push({name: m, value: 0})
            }
        });
    }

    onSelectQuarterly($event: any) {
        this.quarterlyRevenues = this.productService.getQuarterlyRevenues(this.selectedYear, $event, this.products);
    }

    getCurrentMonth() {
        let month = moment().format('MMMM');
        return month[0].toUpperCase() + month.slice(1);
    }

    onSelectMonth(month: any) {
        this.monthlyRevenues = this.productService.getMonthlyRevenues(this.selectedYear, month, this.products);
    }
}
