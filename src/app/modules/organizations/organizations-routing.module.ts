import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountDetailsComponent } from './account-details/account-details.component';
import { PaperTrailComponent } from './paper-trail/paper-trail.component';
import { OrganizationComponent } from './organization/organization.component';
import { UserManagementComponent } from './user-management/user-management.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'account-details', component: AccountDetailsComponent },
    { path: 'paper-trail', component: PaperTrailComponent },
    { path: 'organization', component: OrganizationComponent },
    { path: 'user-management', component: UserManagementComponent}
  ])],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
