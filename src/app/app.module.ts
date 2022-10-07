import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderComponent } from './pages/order/order.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './pages/admin/admin.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/en';
import { GeneralComponent } from './pages/report-seller/general/general.component';
import { CustomerMobileComponent } from './pages/customer-mobile/customer-mobile.component';

registerLocaleData(localeEs, 'en');

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    OrderComponent,
    GeneralComponent,
    CustomerMobileComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
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
    
    SharedModule,
    AdminModule,
    RouterModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'en' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
