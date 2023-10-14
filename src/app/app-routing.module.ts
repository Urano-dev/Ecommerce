import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutComponent } from './components/about/about.component';
import { DetailsComponent } from './components/details/details.component';
import { CartComponent } from './components/cart/cart.component';
import { SignupComponent } from './components/signup/signup.component';

//title: 'First component', se puede agregar junto al PATH
const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"checkout", component:CheckoutComponent},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"shop", component:ProductsComponent},
  {path:"cart", component:CartComponent},
  {path:"shop/:category", component:ProductsComponent},
  {path:"about", component:AboutComponent},
  {path:"details/:id", component:DetailsComponent},
  {path:"admin", loadChildren:()=> import('./modules/admin/admin.module').then(m => m.AdminModule)},
  {path:"user", loadChildren:()=> import('./modules/user/user.module').then(m => m.UserModule)},
  {path:"**", component:HomeComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
