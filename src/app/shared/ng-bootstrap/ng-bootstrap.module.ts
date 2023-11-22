import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgbPaginationModule
  ],
  exports: [
    NgbPaginationModule
  ]
})
export class NgBootstrapModule { }
