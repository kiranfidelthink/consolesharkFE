import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AccountDetailsComponent } from './account-details/account-details.component';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PaperTrailComponent } from './paper-trail/paper-trail.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import { OrganizationComponent } from './organization/organization.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserManagementComponent } from './user-management/user-management.component';
import { NgxSpinnerModule } from "ngx-spinner";

// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    OrganizationsRoutingModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    NgxSpinnerModule
  ],
  declarations: [
    AccountDetailsComponent,
    PaperTrailComponent,
    OrganizationComponent,
    UserManagementComponent
  ]
})
export class OrganizationsModule { }
