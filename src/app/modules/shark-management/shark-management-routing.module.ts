import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplianceComponent } from './appliance/appliance.component';
import { DongleComponent } from './dongle/dongle.component';



// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'appliance', component: ApplianceComponent },
    { path: 'dongle', component: DongleComponent }
  ])],
  exports: [RouterModule]
})
export class SharkManagementRoutingModule { }
