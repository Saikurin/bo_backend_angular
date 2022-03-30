import {Component, OnInit} from '@angular/core';
import {Product} from "../../core/interfaces/product";
import {ProductsService} from "../../core/services/products.service";
import {NzButtonType} from "ng-zorro-antd/button";
import {NotificationService} from "../../core/services/notification.service";
import {Histories} from "../../core/interfaces/histories";
import * as moment from "moment";
import {HistoriesService} from "../../core/services/histories.service";

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitComponent implements OnInit {

  options: Product[] = [];
  selectedValue: any;
  product: Product | undefined;
  availability: NzButtonType = "primary";
  editInventory: number = 0;
  editPercentageValue: number = 0;

  constructor(public productsService: ProductsService, private notificationService: NotificationService, private historyService: HistoriesService) {
    this.product = undefined;
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
    this.product = this.options.find(p => p.id === $event);
    if (this.product) {
      this.editPercentageValue = this.product.price_on_sale;
    }
  }

  addArticleToInventory() {
    this.updateInventory('add');
  }

  removeArticleToInventory() {
    this.updateInventory('remove');
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
      this.productsService.updateInventory(action, this.editInventory, this.product).subscribe((p) => {
        if (this.product) {
          let history: Histories = {
            created_at: moment().toDate(),
            price: this.product.price_on_sale * (this.product.discount > 0 ? (this.product.discount / 10) : 1),
            product: this.product,
            quantity: this.editInventory,
            type: (action === 'add') ? 'ajout' : 'retrait-par-vente'
          }
          this.historyService.addHistory(history).subscribe({
            next: () => {
              this.notificationService.successNotification('Modification effectuée', "La modification du stock a bien été éffectuée")
            },
            error: err => {
              console.error(err);
            }
          })
        }
      })
    }
    return false;
  }
}
