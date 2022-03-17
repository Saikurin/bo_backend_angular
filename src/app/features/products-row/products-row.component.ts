import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../core/interfaces/product";
import {FormControl} from "@angular/forms";

@Component({
    selector: '[app-products-row]',
    templateUrl: './products-row.component.html',
    styleUrls: ['./products-row.component.css']
})
export class ProductsRowComponent implements OnInit {

    @Input() product!: Product;
    @Input() histories!: any[];

    addToInventory = new FormControl('');
    removeToInventory = new FormControl('');
    reasonRemoveToInventory = new FormControl('retrait-par-vente');

    @Output() onUpdateAddToInventory = new EventEmitter<number>();
    @Output() onUpdateRemoveToInventory = new EventEmitter<any>();
    show: boolean = false;
    hasError: boolean = false;

    constructor() {
    }

    formatterPercent = (value: number): string => `${value} %`;

    parserPercent = (value: string): string => value.replace(' %', '');

    ngOnInit(): void {
        this.addToInventory.valueChanges.subscribe(x => {
            this.onUpdateAddToInventory.emit(x);
        })
        this.removeToInventory.valueChanges.subscribe(x => {
            this.onUpdateRemoveToInventory.emit({x: x, reason: this.reasonRemoveToInventory.value});
        })
        this.reasonRemoveToInventory.valueChanges.subscribe(x => {
            this.onUpdateRemoveToInventory.emit({x: this.removeToInventory.value, reason: x});
        })
    }

    updateDiscountPrice($event: number) {
        this.product.discount = $event;
        if (this.product.discount < 0 || this.product.discount > 100) {
            this.hasError = true;
        } else {
            this.hasError = false;
            this.product.price_on_sale = this.product.price - (this.product.price * (this.product.discount / 100));
        }
    }
}
