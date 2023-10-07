import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { OrdersComponent } from './orders/orders.component';
import { StatsComponent } from './stats/stats.component';
import { EditProductComponent } from './edit-product/edit-product.component';


const routes: Routes = [

  {path: '', component:DashboardComponent},
  {path: 'products', component:ProductsListComponent},
  {path: 'orders', component:OrdersComponent},
  {path: 'stats', component:StatsComponent},
  {path: 'new-product', component:NewProductComponent},
  {path: 'edit-product/:id', component: EditProductComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
