import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from '../../shared/sharedService/customValidation.service';
import { AuthService } from 'src/app/auth/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'organization-modal',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationModalComponent implements OnInit {
  @Input() fromParent;
  msg: string;
  organizationForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    public activeModal: NgbActiveModal,
    private auth: AuthService,
    private routes: Router
  ) {}

  ngOnInit() {
    console.log('this.fromParent', this.fromParent);
    this.organizationForm = this.fb.group(
      {
        companyName: ['', Validators.required],
        companyAddress: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.phonePatternValidator(),
          ]),
        ],
        cell: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.cellPatternValidator(),
          ]),
        ],
      }
    );
  }

  get organizationFormControl() {
    return this.organizationForm.controls;
  }

  onSubmit() {
    console.log("Insdie submit", this.organizationForm.value)
    this.submitted = true;
    // if (this.organizationForm.valid) {
    //   const user = {
    //     first_name: this.organizationForm.value.companyName,
    //     last_name: this.organizationForm.value.companyAddress,
    //     mobile_number: '+91' + this.organizationForm.value.contactNumber,
    //     email: this.organizationForm.value.email,
    //     password: this.organizationForm.value.password,
    //   };
    //   this.auth.registerUser(user).subscribe((res) => {
    //   });
    // }
  }
  
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
  //  closeModal() {
  //   //   this.activeModal.close();
  //   // }
}
