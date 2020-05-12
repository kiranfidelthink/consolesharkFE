import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from '../../shared/sharedService/customValidation.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { HttpClient } from '@angular/common/http';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'register-modal',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterModalComponent implements OnInit {
  // @Input() fromParent;
  // msg: string;
  registerForm: FormGroup;
  submitted = false;
  // showToastMessage: boolean = false;

  messageForToast = {
    messageType: 'Success!',
    message: ' Your registration is successful.',
    alertType: 'success',
  };
  log: any = {
    time: new Date().getTime(),
    email: localStorage.getItem('userEmail'),
    user_id: localStorage.getItem('user_id'),
    triggered_by: 'Login Page',
    severity: 'Informational',
  };
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    public activeModal: NgbActiveModal,
    private _auth: AuthService,
    private _toastService: ToastService,
    private http: HttpClient,
    private _logService: LogService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getIPAddress();
    // console.log('this.fromParent', this.fromParent);
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        contactNumber: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.contactPatternValidator(),
          ]),
        ],
        // username: [
        //   '',
        //   [Validators.required],
        //   this.customValidator.userNameValidator.bind(this.customValidator),
        // ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(),
          ]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  getIPAddress() {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // console.log("this.registerForm", this.registerForm)
    if (this.registerForm.valid) {
      const user: any = {
        first_name: this.registerForm.value.firstName,
        last_name: this.registerForm.value.lastName,
        mobile_number:
          this.registerForm.value.contactNumber.dialCode +
          this.registerForm.value.contactNumber.number,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        organization_id: null,
      };
      this.spinner.show();
      this._auth.registerUser(user).subscribe(
        (res) => {
          this.log.email = this.registerForm.value.email;
          this.log.event_type = 'User registered';
          this.log.message = 'User has successfully registered';
          this._logService.createLog(this.log).subscribe((res: any) => {});
          // console.log("register success", res)
          this.createUser(user);
        },
        (err: any) => {
          this.log.event_type = 'Registration Failure';
          this.log.message = 'Failed to register user';
          this._logService.createLog(this.log).subscribe((res: any) => {});
        }
      );
    }
  }
  createUser(user) {
    this._auth.createUser(user).subscribe((res) => {
      // console.log("create user success", res)
      if (res) {

        this._toastService.showSuccessToastr('Registration successfully', '');
        // this.showToastMessage = true;
      }
      setTimeout(() => {
        this.activeModal.close();
        this.spinner.hide();
      }, 3000);
    });
  }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  //  closeModal() {
  //   //   this.activeModal.close();
  //   // }
}
