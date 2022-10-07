import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './pages/admin/customer/customer.component';
import { CustomerMobileComponent } from './pages/customer-mobile/customer-mobile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderReceivableComponent } from './pages/order-receivable/order-receivable.component';
import { OrderComponent } from './pages/order/order.component';
import { OrdersReceivableComponent } from './pages/orders-receivable/orders-receivable.component';
import { GeneralComponent } from './pages/report-seller/general/general.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'pedido', component: OrderComponent},
  { path: 'pedido-cobrar/:id', component: OrderReceivableComponent},
  { path: 'pedidos-cobrar', component: OrdersReceivableComponent},
  { path: 'cliente', component: CustomerMobileComponent },
  { path: 'reporte/ventas-hoy', component: GeneralComponent },
  { path: 'pagina-no-encontrada', component: PageNotFoundComponent},
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
    scrollOffset: [0, 0],
    // Enable scrolling to anchors
    anchorScrolling: "enabled",
  }),
  // AdminRoutingModule
],
  exports: [RouterModule]
})
export class AppRoutingModule { }