import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from '../../shared/sharedService/customValidation.service';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { UserService } from 'src/app/shared/shared-service/user-service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LogService } from 'src/app/shared/shared-service/log.service';
// import * as data from '../../shared/shared-service/countryList.json';

@Component({
  selector: 'create-existing-org-modal',
  templateUrl: './create-existing-org.component.html',
  styleUrls: ['./create-existing-org.component.css'],
})
export class CreateExistingOrgComponent implements OnInit {
  @Input() fromParent;
  msg: string;
  organizationForm: FormGroup;
  existingOrganizationForm: FormGroup;
  submitted = false;
  user_id: string;
  userOrganizationInfo: any;
  ipAddress = '';
  @Output() onFilter = new EventEmitter();
  current_time: number;
  userEmail: string;
  checkboxValue: boolean;
  // products: any = (data as any).default;
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
    private _emitService: EmitService,
    private _userService: UserService,
    private _toastService: ToastService,
    private routes: Router,
    private http: HttpClient,
    private _logService: LogService
  ) {}

  ngOnInit() {
    this.getIPAddress();
    const epochNow = new Date().getTime();
    this.current_time = epochNow;
    this.userEmail = localStorage.getItem('userEmail');
    // to print only path eg:"/login"
    // console.log("this.router.url", this.routes.url.split('?')[0])
    // console.log('this.fromParent', this.fromParent);
    this.organizationForm = this.fb.group({
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      copyAddress: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      billingCountry: ['', Validators.required],
      billingState: ['', Validators.required],
      billingCity: ['', Validators.required],
      billingZipCode: ['', Validators.required],
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
    });
    this.existingOrganizationForm = this.fb.group({
      organizationId: ['', Validators.required],
      // companyAddress: ['', Validators.required],
      // name: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      // phone: [
      //   '',
      //   Validators.compose([
      //     Validators.required,
      //     this.customValidator.phonePatternValidator(),
      //   ]),
      // ],
      // cell: [
      //   '',
      //   Validators.compose([
      //     Validators.required,
      //     this.customValidator.cellPatternValidator(),
      //   ]),
      // ],
    });
  }

  get organizationFormControl() {
    return this.organizationForm.controls;
  }
  get existingOrganizationFormControl() {
    return this.existingOrganizationForm.controls;
  }
  copyAddressField() {
    console.log('checkboxValue', this.checkboxValue);
    if (this.checkboxValue == true) {
      console.log('inside if');
      this.organizationForm.controls.billingCountry.setValue(
        this.organizationForm.value.country
      );
      this.organizationForm.controls.billingState.setValue(
        this.organizationForm.value.state
      );
      this.organizationForm.controls.billingCity.setValue(
        this.organizationForm.value.city
      );
      this.organizationForm.controls.billingZipCode.setValue(
        this.organizationForm.value.zipCode
      );
    } else {
      console.log('inside else');
    }
  }
  copyAddress1(event: any) {
    console.log(event.target);
    if (event == 'checked') {
      console.log('inside if');
      this.organizationForm.controls.billingCountry.setValue(
        this.organizationForm.value.country
      );
      this.organizationForm.controls.billingState.setValue(
        this.organizationForm.value.state
      );
      this.organizationForm.controls.billingCity.setValue(
        this.organizationForm.value.city
      );
      this.organizationForm.controls.billingZipCode.setValue(
        this.organizationForm.value.zipCode
      );
    }
  }
  getIPAddress() {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
    });
  }
  onSubmit() {
    console.log('Insdie submit', this.organizationForm.value);
    console.log('this.organizationForm', this.organizationForm);
    this.user_id = localStorage.getItem('user_id');

    this.submitted = true;
    if (this.organizationForm.valid) {
      const organization = {
        company_name: this.organizationForm.value.companyName,
        company_address: this.organizationForm.value.companyAddress,
        country: this.organizationForm.value.country,
        state: this.organizationForm.value.state,
        city: this.organizationForm.value.city,
        zipCode: this.organizationForm.value.zipCode,
        // user_id: this.user_id,
        billing_contact: {
          billingCountry: this.organizationForm.value.billingCountry,
          billingState: this.organizationForm.value.billingState,
          billingCity: this.organizationForm.value.billingCity,
          billingZipCode: this.organizationForm.value.billingZipCode,
          name: this.organizationForm.value.name,
          email: this.organizationForm.value.email,
          phone: this.organizationForm.value.phone,
          cell: this.organizationForm.value.cell.number,
          countryCode: this.organizationForm.value.cell.dialCode,
          countryISO: this.organizationForm.value.cell.countryCode,
        },
      };
      const log_details = {
        ip_address: this.ipAddress,
        triggered_by: this.routes.url.split('?')[0],
        email_id: this.userEmail,
        user_id: this.user_id,
        time: this.current_time,
      };
      this._userService.createOrganization(organization, log_details).subscribe(
        (res: any) => {
          console.log('create organization res', res);
          this.log.event_type = 'Organization created';
          this.log.message = 'Organization created Successfully';
          console.log('this.log', this.log);
          this._logService.createLog(this.log).subscribe((res: any) => {
            console.log('craete log in login', res);
          });

          this._emitService.reloadOrganizationDetails('');
          this._toastService.showToastr(
            'Organization created successfully',
            ''
          );
          this.updateUser(res.id);
          this.activeModal.close();
        },
        (err: any) => {
          this.log.event_type = 'Organization not created';
          this.log.message = 'Failed to create organization';
          this._logService.createLog(this.log).subscribe((res: any) => {
            console.log('craete log in login', res);
          });
        }
      );
    }
  }
  updateUser(organizationId) {
    console.log('organizationId', organizationId);
    this._userService
      .updateUserByOrganization(organizationId)
      .subscribe((res: any) => {
        console.log('updateUserByOrganization res', res);
        // this.activeModal.close();
      });
  }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
  //  closeModal() {
  //   //   this.activeModal.close();
  //   // }

  onSubmitExistingOrg() {}

  countries = [
    { id: 0, name: 'India' },
    { id: 1, name: 'USA' },
    { id: 2, name: 'Australia' },
  ];
  states = [
    { id: 0, name: 'Maharastra' },
    { id: 1, name: 'Madhya Pradesh' },
    { id: 2, name: 'Gujrat' },
  ];
  cities = [
    { id: 0, name: 'Pune' },
    { id: 1, name: 'Mulbai' },
    { id: 2, name: 'Delhi' },
  ];

  
}
