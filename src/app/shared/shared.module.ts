import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarBottomComponent } from './navbar-bottom/navbar-bottom.component';
import { RideSidebarComponent } from './ride-sidebar/ride-sidebar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminRoutingModule } from '../pages/admin/admin-routing-module';
import { RouterModule } from '@angular/router';
import { OrderReceivableCardboxComponent } from '../components/order-receivable-cardbox/order-receivable-cardbox.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { NumericFieldDirective } from '../directives/numeric-field.directive';
import { IConfig, NgxMaskModule } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    HeaderMobileComponent,
    NavbarComponent,
    NavbarBottomComponent,
    RideSidebarComponent,
    SidebarComponent,
    LoaderComponent,
    NumericFieldDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  exports: [
    HeaderMobileComponent,
    NavbarComponent,
    NavbarBottomComponent,
    RideSidebarComponent,
    SidebarComponent,
    LoaderComponent,
    NumericFieldDirective,
    NgxMaskModule
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }
