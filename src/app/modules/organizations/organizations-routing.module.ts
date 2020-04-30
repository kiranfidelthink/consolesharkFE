import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountDetailsComponent } from './account-details/account-details.component';
import { PaperTrailComponent } from './paper-trail/paper-trail.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'account-details', component: AccountDetailsComponent },
    { path: 'paper-trail', component: PaperTrailComponent }
  ])],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
