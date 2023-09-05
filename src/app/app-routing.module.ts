import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"checkout", component:CheckoutComponent},
  {path:"login", component:LoginComponent},
  {path:"admin", loadChildren:()=> import('./modules/admin/admin.module').then(m => m.AdminModule)},
  {path:"user", loadChildren:()=> import('./modules/user/user.module').then(m => m.UserModule)},
  {path:"**", component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
