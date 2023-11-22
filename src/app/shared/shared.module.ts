import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { FooterAdminComponent } from './components/footer-admin/footer-admin.component';
import { SidenavAdminComponent } from './components/sidenav-admin/sidenav-admin.component';
import { PipesModule } from './pipes/pipes.module';
import { DashboardRoutingModule } from '../views/admin/components/dashboard/dashboard-routing.module';







@NgModule({
  declarations: [
    HeaderAdminComponent,
    FooterAdminComponent,
    SidenavAdminComponent,




  ],
  imports: [
    CommonModule,
    PipesModule,
    DashboardRoutingModule,
  ],
  exports: [
    HeaderAdminComponent,
    FooterAdminComponent,
    SidenavAdminComponent,
    PipesModule,
  ]
})
export class SharedModule { }
