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
    private service: AuthService,
    private routes: Router,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}
  msg;
  ngOnInit() {
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
    if (this.loginForm.valid) {
      console.log('this.loginForm.valid', this.loginForm.value);
      console.warn(this.loginForm.value);

      var output = this.service.checkusernameandpassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      if (output == true) {
        this.routes.navigate(['/']);
      } else {
        this.msg = 'Invalid username or password';
      }
    }
  }

  openModal() {
    const modalRef = this.modalService.open(RegisterModalComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
    });

    let data = {
      prop1: 'Some Data',
      prop2: 'From Parent Component',
      prop3: 'This Can be anything',
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        console.log('result', result);
      },
      (reason) => {}
    );
  }

  openForgotPasswordModal(){
    const modalRef = this.modalService.open(ForgotPasswordModalComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
    });

    let data = {
      prop1: 'Some Data',
      prop2: 'From Parent Component',
      prop3: 'This Can be anything',
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        console.log('result', result);
      },
      (reason) => {}
    );
  }
}
