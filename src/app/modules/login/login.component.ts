import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from '../../modals/register/register.component';
import { ForgotPasswordModalComponent } from '../../modals/forgot-password/forgot-password.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { HttpClient } from '@angular/common/http';
import { CustomvalidationService } from 'src/app/shared/sharedService/customValidation.service';
import { UserService } from 'src/app/shared/shared-service/user-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/shared/shared-service/toast-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  mobileVerificationForm: FormGroup;
  clientId: string;
  username: string;
  code: string;
  emailId: string;
  currentUserDetail: any;
  mobileNumber: number;
  submitted = false;

  log: any = {
    time: new Date().getTime(),
    email: localStorage.getItem('userEmail'),
    user_id: localStorage.getItem('user_id'),
    triggered_by: 'Login Page',
    severity: 'Informational',
  };
  getQueryParam: string;
  userEmail: any;
  currentUserDetails: any;
  constructor(
    private _auth: AuthService,
    private routes: Router,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private _logService: LogService,
    private http: HttpClient,
    private customValidator: CustomvalidationService,
    private _userService: UserService,
    private spinner: NgxSpinnerService,
    private _toastService: ToastService,

  ) {}
  msg;
  ngOnInit() {
    this.getIPAddress();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required])],
      rememberMe: [''],
    });
    this.mobileVerificationForm = this.fb.group({
      contactNumber: [{ value: '', disabled: true }, [Validators.required]],
      otp: [
        '',
        Validators.compose([
          Validators.required,
          this.customValidator.otpPatternValidator(),
        ]),
      ],
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }
  getIPAddress() {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
    });
  }
  onSubmit() {
    this.submitted = true;
    this.spinner.show();
    this._auth.loginUser(this.loginForm.value).subscribe(
      (res: any) => {
        this._toastService.showSuccessToastr(
          'Login Successful',
          ''
        );
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 3000);
        console.log('res', res);
        this.log.event_type = 'Login Success';
        this.log.message = 'Authenticate Successfully';
        this.log.email = this.loginForm.value.email;
        console.log('this.log----', this.log);
        this._logService.createLog(this.log).subscribe((res: any) => {});
        localStorage.setItem('jwtToken', res.accessToken.jwtToken);
        localStorage.setItem('userEmail', res.idToken.payload.email);
        this.getCurrentUserDetails();
      },
      (err: any) => {
        console.log("err in login", err.error)
        this._toastService.showErrorToastr(
          err.error,
          ''
        );
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 3000);
        this.log.event_type = 'Login Failure';
        this.log.message = 'Failed to authenticate correctly';
        this._logService.createLog(this.log).subscribe((res: any) => {});
      }
    );
  }

  openRegisterModal() {
    this.modalService.open(RegisterModalComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
    });
  }

  openForgotPasswordModal() {
    this.modalService.open(ForgotPasswordModalComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
    });
  }
  getCurrentUserDetails() {
    this.userEmail = localStorage.getItem('userEmail');
    this._userService
      .getUserAndOrganization(this.userEmail)
      .subscribe((res: any) => {
        console.log("Inside login component res", res)
        localStorage.setItem('user_id', res.id);
        console.log('res of get user in login component', res);
        if (res.mfa_enabled == true) {
          this.currentUserDetails = res;
          this.getQueryParam = res.mfa_enabled;
          this.resendOTP();
        } else {
          console.log('inside else in login component');
          if (res.organization_id == null) {
            console.log('inside if of login with condition');
            if (res.requests.length == 0) {
              this.routes.navigate(['/']);
            } else {
              this.routes.navigate(['/request-status']);
            }
          } else {
            this.routes.navigate(['/']);
          }
        }
      });
  }
  resendOTP() {
    this.getUserDetails(localStorage.getItem('userEmail'));
  }
  getUserDetails(emailId) {
    console.log('emailId in mobile verification', emailId);
    this._userService.getUserAndOrganization(emailId).subscribe((res: any) => {
      console.log('getUSerOrganization res in mobile verification', res);
      this.sendOTP(res);
      this.currentUserDetail = res;
      this.mobileNumber = this.currentUserDetail.mobile_number;
    });
  }
  sendOTP(userData) {
    this._userService.sendMobileOTP(userData).subscribe((res: any) => {});
  }
  get mobileVerificationFormControl() {
    return this.mobileVerificationForm.controls;
  }
  onSubmitMFA() {
    this.submitted = true;
    const userData: any = {
      otp: this.mobileVerificationForm.value.otp,
      mobile_number: this.currentUserDetail.mobile_number,
    };
    this._userService.verifyMobile(userData).subscribe((res) => {
      this.log.event_type = 'Mobile verification';
      this.log.message = 'User mobile verified successfully';
      this.log.email = this.currentUserDetail.email;
      console.log('this.log', this.log);
      this._logService.createLog(this.log).subscribe((res: any) => {});
      this.routes.navigate(['dashboards']);
    });
    if (this.mobileVerificationForm.valid) {
      console.warn(this.mobileVerificationForm.value);
    }
  }
}
