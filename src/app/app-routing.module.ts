import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent } from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {ProfileComponent } from "./profile/profile.component";
import {ProductsComponent } from './products/products.component';
import {OrdersComponent } from './orders/orders.component';
import {MakeOrderComponent } from './make-order/make-order.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'make-order/:product_id', component: MakeOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
