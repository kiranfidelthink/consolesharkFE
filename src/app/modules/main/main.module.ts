import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AppRoutingModule } from "../../app-routing.module";
import { ReactiveFormsModule } from '@angular/forms';
import { HostManagementComponent } from './host-management/host-management.component';




@NgModule({
  declarations: [HomeComponent, UserDetailsComponent, HostManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [HomeComponent, UserDetailsComponent, HostManagementComponent],
})
export class MainModule { }
