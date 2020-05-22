import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplianceComponent } from './appliance/appliance.component';



// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'appliance', component: ApplianceComponent }
  ])],
  exports: [RouterModule]
})
export class SharkManagementRoutingModule { }
