import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersOfDayComponent } from './orders-of-day/orders-of-day.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProviderComponent } from './provider/provider.component';
import { ProvidersComponent } from './providers/providers.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';

const routes = [
    { path: '',
      component: AdminComponent,
      children: [
        { path: '', component: AdminDashboardComponent },
        { path: 'clientes', component: CustomersComponent },
        { path: 'cliente', component: CustomerComponent },
        { path: 'pedidos', component: OrdersOfDayComponent },
        { path: 'usuario', component: UserComponent },
        { path: 'usuarios', component: UsersComponent },
        { path: 'productos', component: ProductsComponent },
        { path: 'producto/nuevo', component: ProductComponent },
        { path: 'proveedores', component: ProvidersComponent },
        { path: 'proveedor/nuevo', component: ProviderComponent },
      ] 
    }
  ]
  
  @NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }