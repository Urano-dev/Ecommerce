import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { StatsComponent } from './stats/stats.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    OrdersComponent,
    ProductsComponent,
    NewProductComponent,
    EditProductComponent,
    StatsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
