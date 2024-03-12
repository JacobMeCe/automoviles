import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './components/LOGIN/login/login.component';
import { MenuCompartidoComponent } from './components/menu-compartido/menu-compartido.component';
import { IndexComponent } from './components/index/index.component';

import { ActualizarComponent } from 'src/app/shared/components/footer-admin/actualizar/actualizar.component';
import { EstatusComponent } from './components/automoviles/lista-automoviles/estatus/estatus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from 'src/app/shared/components/sidenav-admin/logo/logo.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListaAutomovilesComponent } from './components/automoviles/lista-automoviles/lista-automoviles.component';
import { NuevoAutomovilComponent } from './components/automoviles/nuevo-automovil/nuevo-automovil.component';
import { DetallesAutomovilComponent } from './components/automoviles/detalles-automovil/detalles-automovil.component';
import { ServicioComponent } from './components/automoviles/registros-automovil/servicio/servicio.component';
import { AseguranzaComponent } from './components/automoviles/registros-automovil/aseguranza/aseguranza.component';
import { CombustibleComponent } from './components/automoviles/registros-automovil/combustible/combustible.component';
import { AutomovilRoutingModule } from './components/automoviles/automovil-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    MenuCompartidoComponent,
    IndexComponent,
    ActualizarComponent,
    EstatusComponent,
    LogoComponent,
    ListaAutomovilesComponent,
    NuevoAutomovilComponent,
    DetallesAutomovilComponent,
    ServicioComponent,
    AseguranzaComponent,
    CombustibleComponent,
  ],

  imports: [
    AutomovilRoutingModule,
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
