import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { MenuCompartidoComponent } from './components/menu-compartido/menu-compartido.component';
import { IndexComponent } from './components/index/index.component';

import { ActualizarComponent } from 'src/app/shared/components/footer-admin/actualizar/actualizar.component';
import { EstatusComponent } from './components/vehiculo/lista-vehiculos/estatus/estatus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from 'src/app/shared/components/sidenav-admin/logo/logo.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    LoginComponent,
    MenuCompartidoComponent,
    IndexComponent,
    ActualizarComponent,
    EstatusComponent,
    LogoComponent,
  ],

  imports: [
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    NgOptimizedImage,
  ],
})
export class AdminModule {}
