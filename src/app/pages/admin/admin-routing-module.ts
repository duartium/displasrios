import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers/customers.component';

const routes = [
    { path: '',
      component: AdminComponent,
      children: [
        { path: '', component: AdminDashboardComponent },
        { path: 'clientes', component: CustomersComponent },
        { path: 'cliente', component: CustomerComponent },

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