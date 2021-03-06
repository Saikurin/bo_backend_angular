import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {DetailsProduitComponent} from "./pages/details-produit/details-produit.component";
import {TableProductsComponent} from "./pages/table-products/table-products.component";
import {DataHistoryComponent} from "./pages/data-history/data-history.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'product', component: DetailsProduitComponent},
    {path: 'table-products', component: TableProductsComponent},
    {path: 'data-history', component: DataHistoryComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
