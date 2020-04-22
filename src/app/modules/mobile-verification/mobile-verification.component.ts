import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from '../../modals/register/register.component';
import { ForgotPasswordModalComponent } from '../../modals/forgot-password/forgot-password.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from 'src/app/shared/sharedService/customValidation.service';

@Component({
  selector: 'app-mobile-verification',
  templateUrl: './mobile-verification.component.html',
  styleUrls: ['./mobile-verification.component.css'],
  providers: [AuthService],
})
export class MobileVerifyComponent implements OnInit {
  mobileVerificationForm: FormGroup;
  submitted = false;

  constructor(
    private service: AuthService,
    private routes: Router,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
  ) {}
  msg;
  ngOnInit() {
    this.mobileVerificationForm = this.fb.group({
      contactNumber: [{value:'xxx-xxx-1234',disabled: true}, [Validators.required]],
      otp: ['', Validators.compose([
        Validators.required,
        this.customValidator.otpPatternValidator(),
      ]),],
    });
  }
  get mobileVerificationFormControl() {
    return this.mobileVerificationForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.mobileVerificationForm.valid) {
      console.log('this.mobileVerificationForm.valid', this.mobileVerificationForm.value);
      console.warn(this.mobileVerificationForm.value);
      
    }
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
