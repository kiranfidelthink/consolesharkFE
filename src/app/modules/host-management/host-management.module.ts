import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SiteManagementComponent } from './site-management/site-management.component';

import { SiteManagementRoutingModule } from './host-management-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from 'src/app/shared/shared.module';

// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SiteManagementRoutingModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    NgxSpinnerModule,
    SharedModule
  ],
  declarations: [
    SiteManagementComponent
  ]
})
export class HostManagementModule { }
