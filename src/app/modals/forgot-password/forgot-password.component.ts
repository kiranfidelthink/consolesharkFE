import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'forgot-password-modal',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordModalComponent implements OnInit {
  // @Input() fromParent;
  // msg: string;
  forgotPasswordForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
      }
    );
  }

  get forgotPasswordFormControl() {
    return this.forgotPasswordForm.controls;
  }

  onSubmitForgotPassword() {
    this.submitted = true;
    if (this.forgotPasswordForm.valid) {
    }
  }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
