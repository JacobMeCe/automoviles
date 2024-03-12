import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../LOGIN/login/login.component';
import { IndexComponent } from '../index/index.component';
import { LogoComponent } from 'src/app/shared/components/sidenav-admin/logo/logo.component';
import { ActualizarComponent } from 'src/app/shared/components/footer-admin/actualizar/actualizar.component';
import { EstatusComponent } from '../automoviles/lista-automoviles/estatus/estatus.component';
import { AuthEGuard } from 'src/app/core/guard/authE.guard';

import { ListaAutomovilesComponent } from '../automoviles/lista-automoviles/lista-automoviles.component';
import { NuevoAutomovilComponent } from '../automoviles/nuevo-automovil/nuevo-automovil.component';
import { DetallesAutomovilComponent } from '../automoviles/detalles-automovil/detalles-automovil.component';

const routes: Routes = [
  /*{
    path: '',
    component: DashboardComponent,
  },*/
  {
    path: 'login',
    component: LoginComponent,
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
];

@NgModule({
  imports: [CommonModule, RouterModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
