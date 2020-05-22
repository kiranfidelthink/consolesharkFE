import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplianceComponent } from './appliance/appliance.component';
import { SharkManagementRoutingModule } from './shark-management-routing.module';
import { DongleComponent } from './dongle/dongle.component';

// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharkManagementRoutingModule,
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
    ApplianceComponent,
    DongleComponent
  ]
})
export class SharkManagementModule { }
