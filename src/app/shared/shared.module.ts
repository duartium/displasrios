import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarBottomComponent } from './navbar-bottom/navbar-bottom.component';
import { RideSidebarComponent } from './ride-sidebar/ride-sidebar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminRoutingModule } from '../pages/admin/admin-routing-module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderMobileComponent,
    NavbarComponent,
    NavbarBottomComponent,
    RideSidebarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule
  ],
  exports: [
    HeaderMobileComponent,
    NavbarComponent,
    NavbarBottomComponent,
    RideSidebarComponent,
    SidebarComponent
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }