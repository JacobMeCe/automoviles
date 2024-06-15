import { RouterModule, Routes } from '@angular/router';
import { ListaVehiculosComponent } from './lista-vehiculos/lista-vehiculos.component';
import { AuthEGuard } from '../../../../core/guard/authE.guard';
import { NuevoVehiculoComponent } from './nuevo-vehiculo/nuevo-vehiculo.component';
import { DetallesVehiculoComponent } from './detalles-vehiculo/detalles-vehiculo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListaVehiculosComponent,
        canActivate: [AuthEGuard],
      },
      {
        path: 'nuevo',
        component: NuevoVehiculoComponent,
        canActivate: [AuthEGuard],
      },
      {
        path: ':placas/detalles',
        component: DetallesVehiculoComponent,
        canActivate: [AuthEGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class VehiculoRoutingModule {}
