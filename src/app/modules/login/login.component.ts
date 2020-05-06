import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from '../../modals/register/register.component';
import { ForgotPasswordModalComponent } from '../../modals/forgot-password/forgot-password.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { HttpClient } from '@angular/common/http';
import { Log } from 'src/app/models/log';
import { CustomvalidationService } from 'src/app/shared/sharedService/customValidation.service';
import { UserService } from 'src/app/shared/shared-service/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  mobileVerificationForm: FormGroup;
  clientId:string;
  username:string;
  code:string;
  emailId: string;
  currentUserDetail:any;
  mobileNumber:number;
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
    private _userService: UserService

  ) {}
  msg;
  ngOnInit() {
    this.getCurrentUserDetails();
    const urlParams = new URLSearchParams(window.location.search);
    this.getQueryParam = urlParams.get('mfa');
    console.log("mfa", this.getQueryParam)
    this.getIPAddress();
    // localStorage.removeItem('organizationDetails');
    // localStorage.removeItem('jwtToken');
    this.loginForm = this.fb.group({
      // email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required])],
      rememberMe: [''],
    });
    this.mobileVerificationForm = this.fb.group({
      contactNumber: [{value:'',disabled: true}, [Validators.required]],
      otp: ['', Validators.compose([
        Validators.required,
        this.customValidator.otpPatternValidator(),
      ]),],
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
    this._auth.loginUser(this.loginForm.value).subscribe(
      (res: any) => {
        console.log('res', res);
        this.log.event_type = 'Login Success';
        this.log.message = 'Authenticate Successfully';
        this.log.email = this.loginForm.value.email
        console.log("this.log", this.log)
        this._logService.createLog(this.log).subscribe((res: any) => {
          console.log('craete log in login', res);
        });
        localStorage.setItem('jwtToken', res.accessToken.jwtToken);
        localStorage.setItem('userEmail', res.idToken.payload.email);
        // if (res.idToken.payload.email == 'ms1@mail.com') {
        //   localStorage.setItem('organizationDetails', 'true');
        // }
        this.routes.navigate(['/']);
      },
      (err: any) => {
        this.log.event_type = 'Login Failure';
        this.log.message = 'Failed to authenticate correctly';
        this._logService.createLog(this.log).subscribe((res: any) => {
          console.log('craete log in login', res);
        });
      }
    );
  }

  openRegisterModal() {
    this.modalService.open(RegisterModalComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
    });
    // const modalRef = this.modalService.open(RegisterModalComponent, {
    //   scrollable: true,
    //   windowClass: 'myCustomModalClass',
    // });

    // let data = {
    //   prop1: 'Some Data',
    //   prop2: 'From Parent Component',
    //   prop3: 'This Can be anything',
    // };

    // modalRef.componentInstance.fromParent = data;
    // modalRef.result.then(
    //   (result) => {
    //     console.log('result--', result);
    //   },
    //   (reason) => {}
    // );
  }

  openForgotPasswordModal() {
    this.modalService.open(ForgotPasswordModalComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
    });

    // const modalRef = this.modalService.open(ForgotPasswordModalComponent, {
    //   scrollable: true,
    //   windowClass: 'myCustomModalClass',
    // });

    // let data = {
    //   prop1: 'Some Data',
    //   prop2: 'From Parent Component',
    //   prop3: 'This Can be anything',
    // };

    // modalRef.componentInstance.fromParent = data;
    // modalRef.result.then(
    //   (result) => {
    //     console.log('result---', result);
    //   },
    //   (reason) => {}
    // );
  }
  getCurrentUserDetails() {
    this.userEmail = localStorage.getItem('userEmail')
    this._userService.getUserAndOrganization(this.userEmail).subscribe((res:any) => {
      localStorage.setItem('user_id', res.id)
      // this.getOrganization(res)
      console.log("res of get user in login component", res)
      this.currentUserDetails = res
      // if(res.organization_id !== null){
      //   console.log("Inside if")
      //   if(res.mfa_enabled == true){
      //     console.log("Inside mfs true")
      //     // this.openModal();
      //     this.routes.navigate(['/login'], { queryParams: { mfa: res.mfa_enabled }});
  
          
      //   }

      // localStorage.setItem('organization_id', res.organization_id)
      // }
      // else{
      //   this.openPopup();
      // }
    });
  }
  resendOTP(){
    this.getUserDetails(localStorage.getItem('userEmail'));
  }
  getUserDetails(emailId) {
    
    console.log("emailId in mobile verification", emailId)    

    this._userService.getUserAndOrganization(emailId).subscribe((res:any) => {
      console.log("getUSerOrganization res in mobile verification", res)
      this.sendOTP(res)
      this.currentUserDetail = res;
      this.mobileNumber = this.currentUserDetail.mobile_number; 

      // if(!res.organization_id){
      // }
    });
    // if (localStorage.getItem('organizationDetails') != null) {
    //   console.log('Inside if');
    //   this.openModal();
    // } else {
    //   console.log('Inside else');
    //   // this.routes.navigate(['/login']);
    //   // return false;
    // }
  }
  sendOTP(userData){
    this._userService.sendMobileOTP(userData).subscribe((res:any) => {
      // console.log("resssssss--------", res)
    });
  }
  get mobileVerificationFormControl() {
    return this.mobileVerificationForm.controls;
  }
  onSubmitMFA() {
    // console.log("mobile",this.currentUserDetail)
    // console.log("this.mobileVerificationForm.value",this.mobileVerificationForm.value)
    this.submitted = true;
    const userData:any= {
      otp:this.mobileVerificationForm.value.otp,
      mobile_number:this.currentUserDetail.mobile_number
    }
    this._userService.verifyMobile(userData).subscribe((res) => {
      // console.log("ressss", res)
      this.log.event_type = 'Mobile verification';
        this.log.message = 'User mobile verified successfully';
        this.log.email = this.currentUserDetail.email
        console.log("this.log", this.log)
        this._logService.createLog(this.log).subscribe((res: any) => {
          console.log('craete log in login', res);
        });
      this.routes.navigate(['dashboards']);

      // this.verfiEmail();
    });
    if (this.mobileVerificationForm.valid) {
      
      // console.log('this.mobileVerificationForm.valid', this.mobileVerificationForm.value);
      console.warn(this.mobileVerificationForm.value);
      
    }
  }

  skipMobileVerification(){
    this.routes.navigate(['/login']);
  }
}
