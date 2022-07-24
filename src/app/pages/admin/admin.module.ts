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
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProvidersComponent } from './providers/providers.component';
import { ProviderComponent } from './provider/provider.component';


@NgModule({
  declarations: [
    AdminComponent, 
    CustomerComponent, 
    CustomersComponent, 
    AdminDashboardComponent, 
    UserComponent, 
    UsersComponent, 
    ProductsComponent, 
    ProductComponent, 
    ProvidersComponent, 
    ProviderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    
  ]
})
export class AdminModule { }
