import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteManagementComponent } from './site-management/site-management.component';
import { ManagedHostsComponent } from './managed-hosts/managed-hosts.component';



// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'site-management', component: SiteManagementComponent },
    { path: 'managed-hosts', component: ManagedHostsComponent }
  ])],
  exports: [RouterModule]
})
export class SiteManagementRoutingModule { }
