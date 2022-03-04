import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import {HeaderComponent} from "./features/header/header.component";
import { FooterComponent } from './features/footer/footer.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import { BreadcrumbComponent } from './features/breadcrumb/breadcrumb.component';
import { DetailsProduitComponent } from './pages/details-produit/details-produit.component';
import {ProductsService} from "./core/services/products.service";

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    DetailsProduitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzMenuModule,
    NzIconModule,
    NzLayoutModule,
    NzBreadCrumbModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
