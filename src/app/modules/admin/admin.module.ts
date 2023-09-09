import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { StatsComponent } from './stats/stats.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';



@NgModule({
  declarations: [
    OrdersComponent,
    NewProductComponent,
    EditProductComponent,
    StatsComponent,
    DashboardComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
