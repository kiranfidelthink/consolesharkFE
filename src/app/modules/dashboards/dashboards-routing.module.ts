import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard1Component } from './dashboard/dashboard.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: Dashboard1Component }
  ])],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
