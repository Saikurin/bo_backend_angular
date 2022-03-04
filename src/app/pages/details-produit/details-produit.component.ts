import {Component, OnInit} from '@angular/core';
import {Product} from "../../core/interfaces/product";
import {ProductsService} from "../../core/services/products.service";

@Component({
    selector: 'app-details-produit',
    templateUrl: './details-produit.component.html',
    styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitComponent implements OnInit {

    detailsProduct: Product[] = [];

    product: any;

    constructor(public productsService: ProductsService) {
    }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
      this.productsService.getProductsFromJson().subscribe({
        next: (res: Product[]) => {
            this.detailsProduct = {... res};
        },
        error:(error => {
          alert("Failed loading json data");
          console.error(error);
        })
      });
    }

    getProduct(id: number) {
        return this.detailsProduct.filter(product => {
            return product.id = id;
        });
    }

}
