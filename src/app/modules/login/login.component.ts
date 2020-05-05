import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from '../../modals/register/register.component';
import { ForgotPasswordModalComponent } from '../../modals/forgot-password/forgot-password.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { HttpClient } from '@angular/common/http';
import { Log } from 'src/app/models/log';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  log: any = {
    time: new Date().getTime(),
    email: localStorage.getItem('userEmail'),
    user_id: localStorage.getItem('user_id'),
    triggered_by: 'Login Page',
    severity: 'Informational',
  };
  constructor(
    private _auth: AuthService,
    private routes: Router,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private _logService: LogService,
    private http: HttpClient
  ) {}
  msg;
  ngOnInit() {
    this.getIPAddress();
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
}
