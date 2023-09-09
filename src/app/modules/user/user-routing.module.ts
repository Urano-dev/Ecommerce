import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


const routes: Routes = [

  {path: '', component:MyDashboardComponent},
  {path: 'my-orders', component:MyOrdersComponent},
  {path: 'my-profile', component:MyProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
