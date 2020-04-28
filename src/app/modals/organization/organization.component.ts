import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from '../../shared/sharedService/customValidation.service';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { UserService } from 'src/app/shared/shared-service/user-service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';

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
  user_id: string;
  userOrganizationInfo: any;
  @Output() onFilter = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    public activeModal: NgbActiveModal,
    private _emitService: EmitService,
    private _userService: UserService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    // console.log('this.fromParent', this.fromParent);
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
    console.log("this.organizationForm", this.organizationForm)
    this.user_id = localStorage.getItem('user_id');

    this.submitted = true;
    if (this.organizationForm.valid) {
      const organization = {
        company_name:this.organizationForm.value.companyName,
        company_address: this.organizationForm.value.companyAddress,
        user_id: this.user_id,
            billing_contact:{
                name:this.organizationForm.value.name,
                email:this.organizationForm.value.email,
                phone:this.organizationForm.value.phone,
                cell: this.organizationForm.value.cell.number,
                countryCode: this.organizationForm.value.cell.dialCode,
                countryISO: this.organizationForm.value.cell.countryCode
            }   
        }
      
      this._userService.createOrganization(organization).subscribe((res:any) => {
        console.log("create organization res", res)
        this._emitService.reloadOrganizationDetails('');
        this._toastService.showToastr("Organization created successfully", "");
        // this.updateUser(res.organization_id);
        this.activeModal.close();
      });
    }
  }
  updateUser(organizationId){
    console.log("organizationId", organizationId)
    this._userService.updateUserByOrganization(organizationId).subscribe((res:any) => {
      console.log("updateUserByOrganization res", res)
      // this.activeModal.close();
    });

  }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
  //  closeModal() {
  //   //   this.activeModal.close();
  //   // }
}
