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
    @Output() updateRequest = new EventEmitter<string>();

    addToInventory = new FormControl('');
    removeToInventory = new FormControl('');

    @Output() onUpdateAddToInventory = new EventEmitter<number>();
    @Output() onUpdateRemoveToInventory = new EventEmitter<number>();
    show: boolean = false;
    hasError: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
        this.addToInventory.valueChanges.subscribe(x => {
            this.onUpdateAddToInventory.emit(x);
        })
        this.removeToInventory.valueChanges.subscribe(x => {
            this.onUpdateRemoveToInventory.emit(x);
        })
    }

    updateDiscountPrice() {
        if(this.product.discount < 0 || this.product.discount  >100) {
            this.hasError = true;
        } else {
            this.hasError = false;
            this.product.price_on_sale = this.product.price - (this.product.price * (this.product.discount / 100));
        }
    }
}
