import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { CashRegisterComponent } from './cash-register/cash-register.component';
import { CollectionComponent } from './collection/collection.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CustomerDebtsComponent } from './customer-debts/customer-debts.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers/customers.component';
import { HistoricComponent } from './historic/historic.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersOfDayComponent } from './orders-of-day/orders-of-day.component';
import { PointOfSaleComponent } from './point-of-sale/point-of-sale.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProviderComponent } from './provider/provider.component';
import { ProvidersComponent } from './providers/providers.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { DailySalesComponent } from './reports/daily-sales/daily-sales.component';
import { SellerDebtReportComponent } from './Reports/seller-debt-report/seller-debt-report.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';

const routes = [
    { path: '',
      component: AdminComponent,
      children: [
        { path: '', component: AdminDashboardComponent },
        { path: 'inicio', component: AdminDashboardComponent },
        { path: 'clientes', component: CustomersComponent },
        { path: 'cliente/nuevo', component: CustomerComponent },
        { path: 'pedidos', component: OrdersOfDayComponent },
        { path: 'pedido/:id', component: OrderDetailComponent },
        { path: 'usuario', component: UserComponent },
        { path: 'usuarios', component: UsersComponent },
        { path: 'productos', component: ProductsComponent },
        { path: 'producto/nuevo', component: ProductComponent },
        { path: 'proveedores', component: ProvidersComponent },
        { path: 'proveedor/nuevo', component: ProviderComponent },
        { path: 'punto-venta', component: PointOfSaleComponent },
        { path: 'reporte/ventas-diarias', component: DailySalesComponent },
        { path: 'deuda-clientes', component: CustomerDebtsComponent },
        { path: 'configuracion', component: ConfigurationComponent },
        { path: 'caja', component: CashRegisterComponent },
        { path: 'compras', component: PurchasesComponent },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'historial-pedidos', component: HistoricComponent },
        { path: 'recaudacion', component: CollectionComponent },
        { path: 'reporte/deuda-vendedor', component: SellerDebtReportComponent },
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