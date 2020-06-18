import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './modules/main/main.module';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from './modals/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordModalComponent } from './modals/forgot-password/forgot-password.component';
import { SharedModule } from './shared/shared.module';
import { SidenavService } from './shared/shared-service/sidenav.service';
import { MobileVerifyComponent } from './modules/mobile-verification/mobile-verification.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
// import { OrganizationModalComponent } from './modals/organization/organization.component';
// import { ToastMessageComponent } from './modals/toast-message/toast-message.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { EmitService } from './shared/shared-service/emit-service';
import { UserService } from './shared/shared-service/user-service';
import { ToastService } from './shared/shared-service/toast-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateExistingOrgComponent } from './modals/create-existing-org/create-existing-org.component';
import { LogService } from './shared/shared-service/log.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HostManagementService } from './shared/shared-service/host-management-service';
import { AddNewSiteComponent } from './modals/site/add-site/add-new-site.component';
import { EditSiteComponent } from './modals/site/edit-site/edit-site.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogCOmponent } from './modals/confirm-dialog/confirm-dialog.component';
import { AddNewHostComponent } from './modals/host/add-new-host/add-new-host.component';
import { EditManagedHostComponent } from './modals/host/edit-managed-host/edit-managed-host.component';
import { IgxTimePickerModule } from 'igniteui-angular';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AddNewApplianceComponent } from './modals/appliance/add-appliance/add-appliance.component';
import { EditApplianceComponent } from './modals/appliance/edit-appliance/edit-appliance.component';
import { SharkManagementService } from './shared/shared-service/shark-management-services';
import { AddNewDongleComponent } from './modals/dongle/add-dongle/add-dongle.component';
import { EditDongleComponent } from './modals/dongle/edit-dongle/edit-dongle.component';
import { NgxDaterangepickerMd } from 'ngx-datepicker-material';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { launchConsoleComponent } from './modals/launch-console/launch-console.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterModalComponent,
    ForgotPasswordModalComponent,
    MobileVerifyComponent,
    // OrganizationModalComponent,
    CreateExistingOrgComponent,
    AddNewSiteComponent,
    EditSiteComponent,
    AddNewHostComponent,
    EditManagedHostComponent,
    ConfirmDialogCOmponent,
    AddNewApplianceComponent,
    EditApplianceComponent,
    AddNewDongleComponent,
    EditDongleComponent,
    launchConsoleComponent
    // ToastMessageComponent
  ],
  imports: [
    AutocompleteLibModule,
    SharedModule,
    MainModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatDialogModule,
    IgxTimePickerModule,
    NgxMaterialTimepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxDaterangepickerMd,
    BsDatepickerModule.forRoot()
  ],
  // entryComponents:[
  //   RegisterModalComponent
  // ],
  providers: [
    AuthGuard,
    SidenavService,
    AuthService,
    UserService,
    EmitService,
    ToastService,
    LogService,
    HostManagementService,
    SharkManagementService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
