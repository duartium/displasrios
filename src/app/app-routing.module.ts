import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRoutingModule } from './pages/admin/admin-routing-module';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderReceivableComponent } from './pages/order-receivable/order-receivable.component';
import { OrderComponent } from './pages/order/order.component';
import { OrdersOfDayComponent } from './pages/orders-of-day/orders-of-day.component';
import { OrdersReceivableComponent } from './pages/orders-receivable/orders-receivable.component';

const routes: Routes = [
  // { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'pedido', component: OrderComponent},
  { path: 'pedido-cobrar/:id', component: OrderReceivableComponent},
  { path: 'pedidos-cobrar', component: OrdersReceivableComponent},
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
  AdminRoutingModule
],
  exports: [RouterModule]
})
export class AppRoutingModule { }