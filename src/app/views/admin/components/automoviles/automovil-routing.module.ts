import { RouterModule, Routes } from '@angular/router';
import { ListaAutomovilesComponent } from './lista-automoviles/lista-automoviles.component';
import { AuthEGuard } from '../../../../core/guard/authE.guard';
import { NuevoAutomovilComponent } from './nuevo-automovil/nuevo-automovil.component';
import { DetallesAutomovilComponent } from './detalles-automovil/detalles-automovil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'automoviles',
    children: [
      {
        path: 'lista',
        component: ListaAutomovilesComponent,
        canActivate: [AuthEGuard],
      },
      {
        path: 'nuevo',
        component: NuevoAutomovilComponent,
        canActivate: [AuthEGuard],
      },
      {
        path: ':placas/detalles',
        component: DetallesAutomovilComponent,
        canActivate: [AuthEGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class AutomovilRoutingModule {}
