import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../core/services/categories.service";
import {Categories} from "../../core/interfaces/categories";
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "../../core/services/notification.service";
import {Product} from "../../core/interfaces/product";
import {ProductsService} from "../../core/services/products.service";

@Component({
    selector: 'app-table-products',
    templateUrl: './table-products.component.html',
    styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent implements OnInit {

    categories: Categories[] = [];
    updateInventoryForProducts: any[] = [];
    hasErrorUpdateInventory = false;

    constructor(private categoriesService: CategoriesService, private http: HttpClient, private notificationService: NotificationService, private productService: ProductsService) {
    }

    ngOnInit(): void {
        this.categoriesService.getCategoriesWithProducts().subscribe({
            next: categories => {
                this.categories = categories;
                categories.map(c => {
                    c.products.map(p => {
                        this.updateInventoryForProducts.push({id: p.id});
                    });
                });
            }, error: err => {
                alert('Unable to load categories');
                console.error(err);
            }
        });
    }

    onUpdateAddToInventory(product: Product, value: number) {
        let object = this.updateInventoryForProducts.find(e => e.id === product.id);
        object.add = value;
        this.hasErrorUpdateInventory = false;
    }

    onUpdateRemoveToInventory(product: Product, value: number) {
        if (value > product.quantity_stock) {
            this.notificationService.dangerNotification('Erreur', 'Il n\'y a pas assez de stock');
            this.hasErrorUpdateInventory = true;
        } else {
            let object = this.updateInventoryForProducts.find(e => e.id === product.id);
            object.remove = value;
            this.hasErrorUpdateInventory = false;
        }
    }

    updateInventory() {
        if (this.hasErrorUpdateInventory) {
            this.notificationService.dangerNotification("Erreur logique", "Impossible de mettre à jour les inventaires. Merci de vérifier les champs renseignés.")
        } else {
            let products: Product[] = [];

            this.categories.map(c => {
                c.products.map(product => {
                    products.push(product);
                });
            });

            this.updateInventoryForProducts.map(o => {
                if ('add' in o || 'remove' in o) {
                    let product = products.find(p => p.id === o.id)
                    if (product) {
                        product.quantity_stock += (o.add ?? 0);
                        product.quantity_stock -= (o.remove ?? 0);
                    }
                }
            })

            this.productService.updateMassive(products).subscribe({
                next: () => {
                    this.notificationService.successNotification("Modification massive", "La modification massive a bien été effectuée");
                }, error: (err) => {
                    this.notificationService.dangerNotification("Erreur", "Une erreur interne est survenue");
                    console.error(err);
                }
            })
        }
    }
}
