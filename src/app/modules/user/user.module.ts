import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';



@NgModule({
  declarations: [
    MyOrdersComponent,
    MyDashboardComponent,
    MyProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
