import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { IndexComponent } from '../index/index.component';
import { LogoComponent } from 'src/app/shared/components/sidenav-admin/logo/logo.component';
import { ActualizarComponent } from 'src/app/shared/components/footer-admin/actualizar/actualizar.component';
import { EstatusComponent } from '../vehiculo/lista-vehiculos/estatus/estatus.component';
import { AuthEGuard } from 'src/app/core/guard/authE.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  /*
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'indice',
    component: IndexComponent,
    canActivate: [AuthEGuard],
  },
  {
    path: 'logo',
    component: LogoComponent,
  },
  {
    path: 'pie-de-pagina/actualizar',
    component: ActualizarComponent,
  },
  {
    path: 'listado/:id',
    component: EstatusComponent,
    canActivate: [AuthEGuard],
  },
   */
];

@NgModule({
  imports: [CommonModule, RouterModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
