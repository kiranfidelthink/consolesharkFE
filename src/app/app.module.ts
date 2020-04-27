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
import { MobileVerifyComponent } from './modules/mobile-verification/mobile-verification.component';
import { HttpClientModule } from '@angular/common/http'
import { AuthService } from './auth/auth.service';
import { OrganizationModalComponent } from './modals/organization/organization.component';
import { ToastMessageComponent } from './modals/toast-message/toast-message.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { EmitService } from './shared/shared-service/emit-service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterModalComponent,
    ForgotPasswordModalComponent,
    MobileVerifyComponent,
    OrganizationModalComponent,
    ToastMessageComponent
  ],
  imports: [
    SharedModule,
    MainModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    ToastrModule.forRoot()
  ],
  // entryComponents:[
  //   RegisterModalComponent
  // ],
  providers: [AuthGuard, SidenavService, AuthService, EmitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
