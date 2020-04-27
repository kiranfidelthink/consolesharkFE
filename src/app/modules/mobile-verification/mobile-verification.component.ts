import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from 'src/app/shared/sharedService/customValidation.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/shared-service/user-service';

@Component({
  selector: 'app-mobile-verification',
  templateUrl: './mobile-verification.component.html',
  styleUrls: ['./mobile-verification.component.css'],
})
export class MobileVerifyComponent implements OnInit {
  mobileVerificationForm: FormGroup;
  submitted = false;
  emailId: string;
  clientId:string;
  username:string;
  code:string;
  currentUserDetail:any;
  mobileNumber:number;

  constructor(
    private routes: Router,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.emailId = params['email'];
      this.clientId = params['clientId'];
      this.username = params['username'];
      this.code = params['code'];
      // console.log("emailId", this.emailId); // Print the parameter to the console. 
  });
  }
  msg;
  ngOnInit() {
    this.mobileVerificationForm = this.fb.group({
      contactNumber: [{value:'',disabled: true}, [Validators.required]],
      otp: ['', Validators.compose([
        Validators.required,
        this.customValidator.otpPatternValidator(),
      ]),],
    });

    this.getUserDetails(this.emailId);
  }
  resendOTP(){
    this.getUserDetails(this.emailId);
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
  onSubmit() {
    // console.log("mobile",this.currentUserDetail)
    // console.log("this.mobileVerificationForm.value",this.mobileVerificationForm.value)
    this.submitted = true;
    const userData:any= {
      otp:this.mobileVerificationForm.value.otp,
      mobile_number:this.currentUserDetail.mobile_number
    }
    this._userService.verifyMobile(userData).subscribe((res) => {
      // console.log("ressss", res)
      this.verfiEmail();
    });
    if (this.mobileVerificationForm.valid) {
      
      // console.log('this.mobileVerificationForm.valid', this.mobileVerificationForm.value);
      console.warn(this.mobileVerificationForm.value);
      
    }
  }

  verfiEmail(){
    const verifyEmailDetails:any={
        clientId : this.clientId,
        code : this.code,
        username: this.username
    }
    this._userService.verifyEmailAddress(verifyEmailDetails).subscribe((res) => {
      console.log("ressss=-=-=--==-=", res)
      this.routes.navigate(['/']);
    });

  }
  skipMobileVerification(){
    this.routes.navigate(['/login']);
  }
}
