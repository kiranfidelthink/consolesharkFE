import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AppRoutingModule } from "../../app-routing.module";
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [HomeComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [HomeComponent, UserDetailsComponent],
})
export class MainModule { }
