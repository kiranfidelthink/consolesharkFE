import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserOrgStatusComponent } from './user-org-status/user-org-status.component';

import { UserOrgStatusRoutingModule } from './userOrgStatus-routing.module';



// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    UserOrgStatusRoutingModule
  ],
  declarations: [
    UserOrgStatusComponent
  ]
})
export class UserOrgStatusModule { }
