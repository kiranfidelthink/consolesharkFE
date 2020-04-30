import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountDetailsComponent } from './account-details/account-details.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: AccountDetailsComponent }
  ])],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
