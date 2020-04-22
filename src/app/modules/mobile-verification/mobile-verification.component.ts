import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from '../../modals/register/register.component';
import { ForgotPasswordModalComponent } from '../../modals/forgot-password/forgot-password.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from 'src/app/shared/sharedService/customValidation.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-mobile-verification',
  templateUrl: './mobile-verification.component.html',
  styleUrls: ['./mobile-verification.component.css'],
  providers: [AuthService],
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
    private auth: AuthService,
    private routes: Router,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.emailId = params['email'];
      this.clientId = params['clientId'];
      this.username = params['username'];
      this.code = params['code'];
      console.log("emailId", this.emailId); // Print the parameter to the console. 
  });
  }
  msg;
  ngOnInit() {
    this.mobileVerificationForm = this.fb.group({
      contactNumber: ['', [Validators.required]],
      otp: ['', Validators.compose([
        Validators.required,
        this.customValidator.otpPatternValidator(),
      ]),],
    });

    this.getUserDetails(this.emailId);
  }
  getUserDetails(emailId) {
    
    console.log("resssssss", emailId)

    this.auth.getUSerOrganization(emailId).subscribe((res:any) => {
      console.log("resssssss--------", res)
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
    this.auth.sendMobileOTP(userData).subscribe((res:any) => {
      console.log("resssssss--------", res)
    });
  }
  get mobileVerificationFormControl() {
    return this.mobileVerificationForm.controls;
  }
  onSubmit() {
    console.log("mobile",this.currentUserDetail)
    console.log("this.mobileVerificationForm.value",this.mobileVerificationForm.value)
    this.submitted = true;
    const userData:any= {
      otp:this.mobileVerificationForm.value.otp,
      mobile_number:'+'+this.currentUserDetail.mobile_number
    }
    this.auth.verifyMobile(userData).subscribe((res) => {
      console.log("ressss", res)
      this.verfiEmail();
    });
    if (this.mobileVerificationForm.valid) {
      
      console.log('this.mobileVerificationForm.valid', this.mobileVerificationForm.value);
      console.warn(this.mobileVerificationForm.value);
      
    }
  }

  verfiEmail(){
    const verifyEmailDetails:any={
        clientId : this.clientId,
        code : this.code,
        username: this.username
    }
    this.auth.verifyEmailAddress(verifyEmailDetails).subscribe((res) => {
      console.log("ressss=-=-=--==-=", res)
      this.routes.navigate(['/']);
    });

  }
  openResendModal(){
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
    //     console.log('result', result);
    //   },
    //   (reason) => {}
    // );
  }
}
