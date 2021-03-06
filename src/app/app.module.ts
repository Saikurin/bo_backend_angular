import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {HeaderComponent} from "./features/header/header.component";
import {FooterComponent} from './features/footer/footer.component';
import {fr_FR, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import fr from '@angular/common/locales/fr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {BreadcrumbComponent} from './features/breadcrumb/breadcrumb.component';
import {DetailsProduitComponent} from './pages/details-produit/details-produit.component';
import {ProductsService} from "./core/services/products.service";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzCascaderModule} from "ng-zorro-antd/cascader";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {NzInputModule} from "ng-zorro-antd/input";
import {NotificationService} from "./core/services/notification.service";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {TableProductsComponent} from './pages/table-products/table-products.component';
import {CategoriesService} from "./core/services/categories.service";
import {NzTableModule} from "ng-zorro-antd/table";
import {ProductsRowComponent} from './features/products-row/products-row.component';
import {CsrfInterceptor} from "./core/interceptors/csrf.interceptor";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {DataHistoryComponent} from './pages/data-history/data-history.component';
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {HistoryTurnoverComponent} from './pages/content/history-turnover/history-turnover.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzCardModule} from "ng-zorro-antd/card";
import {HistoryResultsComponent} from './pages/content/history-results/history-results.component';
import {LoginComponent} from './pages/login/login.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {JwtModule} from "@auth0/angular-jwt";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import { RegisterComponent } from './pages/register/register.component';

registerLocaleData(fr);

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, FooterComponent, BreadcrumbComponent, DetailsProduitComponent, TableProductsComponent, ProductsRowComponent, DataHistoryComponent, HistoryTurnoverComponent, HistoryResultsComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, BrowserAnimationsModule, NzMenuModule, NzIconModule, NzLayoutModule, NzBreadCrumbModule, NzGridModule, NzCascaderModule, NzSelectModule, NzButtonModule, NzDividerModule, NzStatisticModule, NzInputModule, NzNotificationModule, NzTableModule, ReactiveFormsModule, HttpClientXsrfModule.withOptions({
    headerName: 'X-CSRFToken', cookieName: 'csrftoken'
  }), NzInputNumberModule, NzSwitchModule, NzTabsModule, NgxChartsModule, NzBadgeModule, NzCardModule, NzFormModule, NzCheckboxModule, JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      allowedDomains: ["localhost:8000"],
    },
  })],
  providers: [{
    provide: NZ_I18N, useValue: fr_FR
  }, ProductsService, NotificationService, CategoriesService, {
    provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true
  }, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
