import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteManagementComponent } from './site-management/site-management.component';



// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'site-management', component: SiteManagementComponent }
  ])],
  exports: [RouterModule]
})
export class SiteManagementRoutingModule { }
