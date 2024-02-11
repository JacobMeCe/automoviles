import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './components/LOGIN/login/login.component';
import { MenuCompartidoComponent } from './components/menu-compartido/menu-compartido.component';
import { IndexComponent } from './components/index/index.component';

import { ActualizarComponent } from 'src/app/shared/components/footer-admin/actualizar/actualizar.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { ListaComponent } from './components/solicitudes/lista/lista.component';
import { EstatusComponent } from './components/solicitudes/lista/estatus/estatus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from 'src/app/shared/components/sidenav-admin/logo/logo.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DatosSolicitudComponent } from './components/datos-solicitud/datos-solicitud.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ServiceModalComponent } from './components/datos-solicitud/modals/service-modal/service-modal.component';
import { InsuranceModalComponent } from './components/datos-solicitud/modals/insurance-modal/insurance-modal.component';
import { FuelModalComponent } from './components/datos-solicitud/modals/fuel-modal/fuel-modal.component';

@NgModule({
  declarations: [
    LoginComponent,
    MenuCompartidoComponent,
    IndexComponent,
    ActualizarComponent,
    SolicitudesComponent,
    ListaComponent,
    EstatusComponent,
    LogoComponent,
    DatosSolicitudComponent,
    ServiceModalComponent,
    InsuranceModalComponent,
    FuelModalComponent,
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
