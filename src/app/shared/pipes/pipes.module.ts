import { EstatusPipe } from './estatus/estatus.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrarEspaciosPipe } from './espacio/filtrar-espacios.pipe';



@NgModule({
  declarations: [
    EstatusPipe,
    FiltrarEspaciosPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EstatusPipe,
    FiltrarEspaciosPipe
  ]
})
export class PipesModule { }
