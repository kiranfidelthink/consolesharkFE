import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from '../../shared/sharedService/customValidation.service';
import { AuthService } from 'src/app/auth/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'register-modal',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterModalComponent implements OnInit {
  @Input() fromParent;
  msg: string;
  registerForm: FormGroup;
  submitted = false;
  showToastMessage: boolean = false;

  messageForToast = {
    messageType:"Success!",
    message:" Your registration is successful.",
    alertType:"success",
  }

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    public activeModal: NgbActiveModal,
    private auth: AuthService,
    private routes: Router,
    private modalService: NgbModal,

  ) {}

  ngOnInit() {
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

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // console.log("this.registerForm", this.registerForm)
    if (this.registerForm.valid) {
      const user = {
        first_name: this.registerForm.value.firstName,
        last_name: this.registerForm.value.lastName,
        mobile_number: this.registerForm.value.contactNumber.dialCode+this.registerForm.value.contactNumber.number,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      this.auth.registerUser(user).subscribe((res) => {
        // console.log("register success", res)
        this.createUser(user);
      });
    }
  }
  createUser(user) {
    this.auth.createUser(user).subscribe((res) => {
      // console.log("create user success", res)
      if(res){
        this.showToastMessage = true;
      }
      setTimeout(() => {
        this.activeModal.close();
      }, 4000);
    });
  }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  //  closeModal() {
  //   //   this.activeModal.close();
  //   // }
}
