import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AccountDetailsComponent } from './account-details/account-details.component';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';



// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    OrganizationsRoutingModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule
  ],
  declarations: [
    AccountDetailsComponent
  ]
})
export class OrganizationsModule { }
