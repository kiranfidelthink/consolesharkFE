import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AppRoutingModule } from "../../app-routing.module";
import { ReactiveFormsModule } from '@angular/forms';
import { HostManagementComponent } from './host-management/host-management.component';
import { FormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';




@NgModule({
  declarations: [HomeComponent, UserDetailsComponent, HostManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
  ],
  exports: [HomeComponent, UserDetailsComponent, HostManagementComponent],
})
export class MainModule { }
