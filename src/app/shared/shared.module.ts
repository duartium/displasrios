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
import { DatatableCustomComponent } from '../components/datatable-custom/datatable-custom.component';
import { NumericFieldDirective } from '../directives/numeric-field.directive';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AlphanumericFieldDirective } from '../directives/alphanumeric-field.directive';
import { ProductCodeFieldDirective } from '../directives/product-code-field.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../components/modal/modal.component';
import { DataTablesModule } from 'angular-datatables';

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
    NumericFieldDirective,
    AlphanumericFieldDirective,
    ProductCodeFieldDirective,
    OrderReceivableCardboxComponent,
    PageNotFoundComponent,
    ModalComponent,
    DatatableCustomComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    NgxMaskModule.forRoot(maskConfig),
    NgbModule,
    DataTablesModule
  ],
  exports: [
    HeaderMobileComponent,
    NavbarComponent,
    NavbarBottomComponent,
    RideSidebarComponent,
    SidebarComponent,
    LoaderComponent,
    NumericFieldDirective,
    NgxMaskModule,
    AlphanumericFieldDirective,
    ProductCodeFieldDirective,
    OrderReceivableCardboxComponent,
    NgbModule,
    CommonModule,
    ModalComponent,
    DatatableCustomComponent,
    DataTablesModule
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }
