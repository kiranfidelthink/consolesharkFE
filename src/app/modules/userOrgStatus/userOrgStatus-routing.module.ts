import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserOrgStatusComponent } from './user-org-status/user-org-status.component'


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: UserOrgStatusComponent }
  ])],
  exports: [RouterModule]
})
export class UserOrgStatusRoutingModule { }
