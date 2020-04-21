import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from "./modules/main/main.module";
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from './modals/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordModalComponent } from './modals/forgot-password/forgot-password.component';
import { SharedModule } from './shared/shared.module';
import { SidenavService } from './shared/sharedService/sidenav.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterModalComponent,
    ForgotPasswordModalComponent
  ],
  imports: [
    SharedModule,
    MainModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  // entryComponents:[
  //   RegisterModalComponent
  // ],
  providers: [AuthGuard, SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
