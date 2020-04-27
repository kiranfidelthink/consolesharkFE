import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from '../../modals/register/register.component';
import { ForgotPasswordModalComponent } from '../../modals/forgot-password/forgot-password.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private _auth: AuthService,
    private routes: Router,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}
  msg;
  ngOnInit() {
    // localStorage.removeItem('organizationDetails');
    // localStorage.removeItem('jwtToken');
    this.loginForm = this.fb.group({
      // email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required])],
      rememberMe: [''],
    });
  }
  get loginFormControl() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this._auth.loginUser(this.loginForm.value).subscribe((res: any) => {
      console.log('res', res);
      localStorage.setItem('jwtToken', res.accessToken.jwtToken);
      localStorage.setItem('userEmail', res.idToken.payload.email);
      // if (res.idToken.payload.email == 'ms1@mail.com') {
      //   localStorage.setItem('organizationDetails', 'true');
      // }
      this.routes.navigate(['/']);
    });
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
}
