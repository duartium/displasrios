import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers/customers.component';
import { AdminRoutingModule } from './admin-routing-module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AdminComponent, 
    CustomerComponent, 
    CustomersComponent, AdminDashboardComponent, UserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AdminRoutingModule,
  ],
  exports: [
    
  ]
})
export class AdminModule { }
