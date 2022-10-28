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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProvidersComponent } from './providers/providers.component';
import { ProviderComponent } from './provider/provider.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DailySalesComponent } from './reports/daily-sales/daily-sales.component';
import { PointOfSaleComponent } from './point-of-sale/point-of-sale.component';
import { CustomerDebtsComponent } from './customer-debts/customer-debts.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CashRegisterComponent } from './cash-register/cash-register.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { OrdersOfDayComponent } from './orders-of-day/orders-of-day.component';
import { OrdersReceivableComponent } from '../orders-receivable/orders-receivable.component';
import { OrderReceivableComponent } from '../order-receivable/order-receivable.component';
import { HistoricComponent } from './historic/historic.component';
import { CollectionComponent } from './collection/collection.component';


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
    ProviderComponent, 
    OrderDetailComponent, 
    DailySalesComponent,
    PointOfSaleComponent,
    CustomerDebtsComponent,
    ConfigurationComponent,
    CashRegisterComponent,
    PurchasesComponent,
    OrdersOfDayComponent,
    OrdersReceivableComponent,
    OrderReceivableComponent,
    HistoricComponent,
    CollectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    SharedModule,
  ]
})
export class AdminModule { }