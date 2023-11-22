import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule} from '@angular/router';


@NgModule({
  declarations: [],
  imports: [CommonModule, DashboardRoutingModule,ReactiveFormsModule,FormsModule, SharedModule,RouterModule],
  providers:[]
})

export class DashboardModule {}
