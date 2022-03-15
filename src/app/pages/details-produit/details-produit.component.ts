import {Component, OnInit} from '@angular/core';
import {Product} from "../../core/interfaces/product";
import {ProductsService} from "../../core/services/products.service";
import {NzButtonType} from "ng-zorro-antd/button";
import {NotificationService} from "../../core/services/notification.service";

@Component({
    selector: 'app-details-produit',
    templateUrl: './details-produit.component.html',
    styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitComponent implements OnInit {

    options: Product[] = [];
    selectedValue: any;
    product: Product | null;
    availability: NzButtonType = "primary";
    editInventory: number = 0;
    editPercentageValue: number = 0;

    constructor(public productsService: ProductsService, private notificationService: NotificationService) {
        this.product = null;
    }


    ngOnInit() {
        this.getProducts()
    }

    getProducts() {
        this.productsService.getProducts().subscribe({
            next: (res: Product[]) => {
                res.map(p => {
                    this.options.push(p)
                })
            },
            error: (error => {
                alert("Failed loading json data");
                console.error(error);
            })
        });
    }

    selectValue($event: any) {
        this.productsService.getProductById($event).subscribe({
            next: (product) => {
                this.product = product;
                //this.profitability = product.price * product.quantity_sold + "€";
                this.editPercentageValue = product.price_on_sale;
            },
            error: error => {
                alert("Failed loading json data");
                console.error(error);
            }
        });
    }

    addArticleToInventory() {
        this.updateInventory('add');
    }

    removeArticleToInventory() {
        this.updateInventory('remove');
    }

    private updateInventory(action: string): boolean {
        if (this.product) {
            if (this.editInventory < 0) {
                this.notificationService.dangerNotification('Erreur', 'Impossible d\'ajouter ou de supprimer du stock inférieur à 0');
                return false;
            } else {
                switch (action) {
                    case 'add':
                        break;
                    case 'remove':
                        if (this.editInventory > this.product.quantity_stock) {
                            this.notificationService.dangerNotification('Erreur', 'Il n\'y a pas assez de stock');
                            return false;
                        }
                }
            }
            this.productsService.updateInventory(action, this.editInventory, this.product).subscribe(
                (p) => {
                    this.notificationService.successNotification('Modification effectuée', "La modification du stock a bien été éffectuée")
                }
            )
        }
        return false;
    }

    editPercentage() {
        if (this.product) {
            if (this.editPercentageValue > 100) {
                this.notificationService.dangerNotification('Erreur', 'La réduction ne peut être supérieur à 100');
                return;
            }
            if (this.editPercentageValue < 0) {
                this.notificationService.dangerNotification('Erreur', 'La réduction ne peut être inférieur à 0');
                return;
            }
            this.productsService.updatePercentage(this.product, this.editPercentageValue).subscribe(p => {
                this.notificationService.successNotification('Modification effectuée', "La modification de la réduction a bien été éffectuée")

            });
        }
    }
}
