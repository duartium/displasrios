import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarBottomComponent } from './shared/navbar-bottom/navbar-bottom.component';
import { OrderComponent } from './pages/order/order.component';
import { HeaderMobileComponent } from './shared/header-mobile/header-mobile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ModalComponent } from './components/modal/modal.component';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './components/loader/loader.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { OrdersReceivableComponent } from './pages/orders-receivable/orders-receivable.component';
import { OrderReceivableCardboxComponent } from './components/order-receivable-cardbox/order-receivable-cardbox.component';
import { OrderReceivableComponent } from './pages/order-receivable/order-receivable.component';
import { OrdersOfDayComponent } from './pages/admin/orders-of-day/orders-of-day.component';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './pages/admin/admin.module';
import { RouterModule } from '@angular/router';


const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    OrderComponent,
    ModalComponent,
    LoaderComponent,
    OrdersReceivableComponent,
    OrderReceivableCardboxComponent,
    OrderReceivableComponent,
    OrdersOfDayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxMaskModule.forRoot(maskConfig),
    SharedModule,
    AdminModule,
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
