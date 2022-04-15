import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { RideSidebarComponent } from './shared/ride-sidebar/ride-sidebar.component';
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
import { OrdersReceivableComponent } from './pages/orders-receivable/orders-receivable.component'
  

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    RideSidebarComponent,
    DashboardComponent,
    LoginComponent,
    NavbarBottomComponent,
    OrderComponent,
    HeaderMobileComponent,
    ModalComponent,
    LoaderComponent,
    OrdersReceivableComponent,
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
