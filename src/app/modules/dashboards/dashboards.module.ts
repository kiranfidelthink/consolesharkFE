import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Dashboard1Component } from './dashboard/dashboard.component';

import { DashboardsRoutingModule } from './dashboards-routing.module';



// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DashboardsRoutingModule
  ],
  declarations: [
    Dashboard1Component
  ]
})
export class DashboardsModule { }
