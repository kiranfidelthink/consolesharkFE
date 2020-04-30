import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from "../../app-routing.module";
import { ReactiveFormsModule } from '@angular/forms';
import { HostManagementComponent } from './host-management/host-management.component';
import { FormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DataTablesModule } from 'angular-datatables';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'




@NgModule({
  declarations: [HomeComponent, HostManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [HomeComponent, HostManagementComponent],
})
export class MainModule { }
