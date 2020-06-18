import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { CustomvalidationService } from 'src/app/shared/shared-service/customValidation.service';
// import { ToastrService } from 'ngx-toastr';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { UserService } from 'src/app/shared/shared-service/user-service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { CountryISO } from 'ngx-intl-tel-input';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'account-details', // tslint:disable-line
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  popularApps: any = [];
  newestApps: any = [];
  userEmail: any;
  currentUserData: any;
  firstName: any;
  lastName: any;
  email: any;
  userOrganizationInfo: any;
  submittedUpdatePasswordForm = false;
  submittedOrganizationForm = false;
  submittedUserUpdateForm = false;
  updatePasswordForm: FormGroup;
  organizationForm: FormGroup;
  updateUserForm: FormGroup;
  MFAForm: FormGroup;
  CountryISO: CountryISO;
  organization_id: any;
  autoRenew = new FormControl();

  log: any = {
    time: new Date().getTime(),
    email: localStorage.getItem('userEmail'),
    user_id: localStorage.getItem('user_id'),
    triggered_by: 'Login Page',
    severity: 'Notification',
  };
  constructor(
    private routes: Router,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private _emitService: EmitService,
    private _userService: UserService,
    private _toastService: ToastService,
    private _logService: LogService,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    this._emitService.listen().subscribe((m: any) => {
      console.log(m);
      this.updateOrganizationDetails(m);
    });
  }
  updateOrganizationDetails(event) {
    this.getUserDetailsOrg();
    console.log('Fire onFilterClick: ', event);
  }

  curTab = 'overview';

  languages = [
    { value: 'English', label: 'English' },
    { value: 'German', label: 'German' },
    { value: 'French', label: 'French' },
  ];

  ngOnInit() {
    this.getIPAddress();
    console.log('CountryISO----', CountryISO.India);
    this.updateUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.MFAForm = this.fb.group({
      autoRenew: ['', Validators.required],
    });
    this.updatePasswordForm = this.fb.group(
      {
        currentPassword: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(),
          ]),
        ],
        newPassword: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(),
          ]),
        ],
        confirmNewPassword: ['', [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword(
          'newPassword',
          'confirmNewPassword'
        ),
      }
    );
    this.organizationForm = this.fb.group({
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        Validators.compose([
          Validators.required,
          this.customValidator.phonePatternValidator(),
        ]),
      ],
      cell: [
        '',
        Validators.compose([
          Validators.required,
          this.customValidator.cellPatternValidator(),
        ]),
      ],
    });
    this.spinner.show();
    this.getUserDetailsOrg();
  }
  getIPAddress() {
    this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
    });
  }

  get updateUserFormControl() {
    return this.updateUserForm.controls;
  }
  get MFAFormControl() {
    return this.MFAForm.controls;
  }
  get updatePasswordFormControl() {
    return this.updatePasswordForm.controls;
  }
  get organizationFormControl() {
    return this.organizationForm.controls;
  }

  getUserDetailsOrg() {
    this.userEmail = localStorage.getItem('userEmail');

    this._userService
      .getUserAndOrganization(this.userEmail)
      .subscribe((res: any) => {
        this.spinner.hide();
        console.log('user details in account details component', res);
        this.organization_id = res.organization_id;
        this.currentUserData = res;
        this.firstName = this.currentUserData.first_name;
        this.lastName = this.currentUserData.last_name;
        this.email = this.currentUserData.email;
      });
  }

  showOrganization(organization_id) {
    this.spinner.show();
    console.log('organization_id', organization_id);
    this.curTab = 'organization';
    this._userService
      .getUserOrganizationById(organization_id)
      .subscribe((res: any) => {
        this.spinner.hide();
        console.log('org', res);
        this.userOrganizationInfo = res;
        console.log('userOrganizationInfo', this.userOrganizationInfo);
      });
  }

  onSubmitUpdatePassword() {
    this.submittedUpdatePasswordForm = true;
    console.log('this.updatePasswordForm', this.updatePasswordForm);
    if (this.updatePasswordForm.valid) {
      const password: any = {
        currentPassword: this.updatePasswordForm.value.currentPassword,
        newPassword: this.updatePasswordForm.value.newPassword,
      };
      this._userService.updatePassword(password).subscribe(
        (res: any) => {
          this.curTab = 'overview';
          console.log('updateUser res', res);
          this.log.event_type = 'Password update';
          this.log.message = 'Password update successfully';
          console.log('this.log', this.log);
          this._logService.createLog(this.log).subscribe((res: any) => {});

          this.updateUserDetail(this.updatePasswordForm.value.newPassword);
          this._toastService.showSuccessToastr(
            'User profile update successfully',
            ''
          );
        },
        (err: any) => {
          this.log.event_type = 'Password not updated';
          this.log.message = 'Failed to update password ';
          this._logService.createLog(this.log).subscribe((res: any) => {});
        }
      );
    }
  }
  updateUserDetail(newPassword) {
    const user: any = {
      password: newPassword,
    };
    this._userService
      .updateUser(user, localStorage.getItem('user_id'))
      .subscribe((res: any) => {
        console.log('updateUser res', res);
        this._toastService.showSuccessToastr('User updated successfully', '');
        this.routes.navigate(['/login']);
      });
  }

  onSubmitupdateUserOrganization() {
    console.log('Insdie submit', this.organizationForm.value);
    console.log('this.organizationForm', this.organizationForm);
    console.log(
      'this.organizationForm.value.cell.number',
      this.organizationForm.value.cell.number
    );
    this.submittedOrganizationForm = true;
    if (this.organizationForm.valid) {
      const organization: any = {
        company_name: this.organizationForm.value.companyName,
        company_address: this.organizationForm.value.companyAddress,
        billing_contact: {
          name: this.organizationForm.value.name,
          email: this.organizationForm.value.email,
          phone: this.organizationForm.value.phone,
          cell: this.organizationForm.value.cell.number,
          countryCode: this.organizationForm.value.cell.dialCode,
          countryISO: this.organizationForm.value.cell.countryCode,
        },
      };
      this._userService
        .updateOrganization(organization)
        .subscribe((res: any) => {
          console.log('create organization res', res);
          this._toastService.showSuccessToastr(
            'Organization update successfully',
            ''
          );
        });
    }
  }
  onSubmitUpdateUser() {
    this.submittedUserUpdateForm = true;
    console.log('this.update user', this.updateUserForm);
    if (this.updateUserForm.valid) {
      const user: any = {
        first_name: this.updateUserForm.value.firstName,
        last_name: this.updateUserForm.value.lastName,
        email: this.updateUserForm.value.email,
      };
      this._userService
        .updateUser(user, localStorage.getItem('user_id'))
        .subscribe(
          (res) => {
            this.curTab = 'overview';
            this.log.event_type = 'Profile update';
            this.log.message = 'Profile update  Successfully';
            console.log('this.log', this.log);
            this._logService.createLog(this.log).subscribe((res: any) => {});
            this._toastService.showSuccessToastr(
              'Profile Updated successfully',
              ''
            );
          },
          (err: any) => {
            this.log.event_type = 'Profile not updated';
            this.log.message = 'Failed to update user';
            this._logService.createLog(this.log).subscribe((res: any) => {});
          }
        );
    }
  }
  onSubmitMFAForm(currentUserData) {
    const user: any = {
      mfa_enabled: this.autoRenew.value,
      id: currentUserData.id,
      first_name: currentUserData.first_name,
      last_name: currentUserData.last_name,
      mobile_number: currentUserData.mobile_number,
      email: currentUserData.email,
      password: currentUserData.password,
      updatedAt: currentUserData.createdAt,
      createdAt: currentUserData.updatedAt,
      organization_id: localStorage.getItem('organization_id'),
    };
    this._userService
      .updateUser(user, localStorage.getItem('user_id'))
      .subscribe((res) => {
        console.log('res of MFA', res);
      });
  }
}
