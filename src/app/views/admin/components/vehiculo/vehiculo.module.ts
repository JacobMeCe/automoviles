import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaVehiculosComponent } from './lista-vehiculos/lista-vehiculos.component';
import { NuevoVehiculoComponent } from './nuevo-vehiculo/nuevo-vehiculo.component';
import { ServicioComponent } from './registros-vehículo/servicio/servicio.component';
import { DetallesVehiculoComponent } from './detalles-vehiculo/detalles-vehiculo.component';
import { AseguranzaComponent } from './registros-vehículo/aseguranza/aseguranza.component';
import { CombustibleComponent } from './registros-vehículo/combustible/combustible.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { VehiculoRoutingModule } from './vehiculo-routing.module';

@NgModule({
  declarations: [
    ListaVehiculosComponent,
    NuevoVehiculoComponent,
    DetallesVehiculoComponent,
    ServicioComponent,
    AseguranzaComponent,
    CombustibleComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    VehiculoRoutingModule,
  ],
})
export class VehiculoModule {}
