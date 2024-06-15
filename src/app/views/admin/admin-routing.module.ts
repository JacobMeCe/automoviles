import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'vehiculos',
        pathMatch: 'full',
      },
      {
        path: 'vehiculos',
        loadChildren: () =>
          import('./components/vehiculo/vehiculo.module').then(
            (m) => m.VehiculoModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
