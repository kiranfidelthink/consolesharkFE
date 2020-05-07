import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from 'src/app/shared/sharedService/customValidation.service';
// import { ToastrService } from 'ngx-toastr';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { UserService } from 'src/app/shared/shared-service/user-service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { CountryISO } from 'ngx-intl-tel-input';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'organization', // tslint:disable-line
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent implements OnInit {
  popularApps: any = [];
  newestApps: any = [];
  organization_id: any;
  currentUserData: any;
  firstName: any;
  lastName: any;
  email: any;
  userOrganizationInfo: any;
  submittedOrganizationForm = false;
  organizationForm: FormGroup;
  CountryISO: CountryISO;
  checkboxValue: boolean;

  log: any = {
    time: new Date().getTime(),
    email: localStorage.getItem('userEmail'),
    user_id: localStorage.getItem('user_id'),
    triggered_by: 'Login Page',
    severity: 'Informational',
  };

  constructor(
    private routes: Router,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private _emitService: EmitService,
    private _userService: UserService,
    private _toastService: ToastService,
    private _logService: LogService,
    private http: HttpClient
  ) {
    this._emitService.listen().subscribe((m: any) => {
      console.log(m);
      this.updateOrganizationDetails(m);
    });
    this.organization_id = localStorage.getItem('organization_id');
  }
  updateOrganizationDetails(event) {
    this.getUserDetailsOrg();
    console.log('Fire onFilterClick: ', event);
  }

  ngOnInit() {
    this.getIPAddress();
    console.log('CountryISO==', CountryISO.India);
    this.organizationForm = this.fb.group({
      companyName: ['', Validators.required],
      addressLineOne: ['', Validators.required],
      addressLineTwo: ['', Validators.required],
      copyAddress: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      billingCountry: ['', Validators.required],
      billingState: ['', Validators.required],
      billingCity: ['', Validators.required],
      billingZipCode: ['', Validators.required],
      billingAddressLineOne: ['', Validators.required],
      billingAddressLineTwo: ['', Validators.required],
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
    this.getUserDetailsOrg();
  }

  getIPAddress() {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
    });
  }

  get organizationFormControl() {
    return this.organizationForm.controls;
  }

  getUserDetailsOrg() {
    this._userService
      .getUserOrganizationById(this.organization_id)
      .subscribe((res: any) => {
        console.log('org', res);
        this.userOrganizationInfo = res;
      });
    // this._userService.getUserAndOrganization(this.userEmail).subscribe((res:any) => {
    //   console.log("resssssss of user==", res)
    //   this.userOrganizationInfo = res.organizations;
    //   this.currentUserData = res
    //   this.firstName= this.currentUserData.first_name
    //   this.lastName= this.currentUserData.last_name
    //   this.email= this.currentUserData.email
    // });
  }
  copyAddressField() {
    console.log('checkboxValue', this.checkboxValue);
    if (this.checkboxValue == true) {
      console.log('inside if');
      this.organizationForm.controls.billingAddressLineOne.setValue(
        this.organizationForm.value.addressLineOne
      );
      this.organizationForm.controls.billingAddressLineTwo.setValue(
        this.organizationForm.value.addressLineTwo
      );
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

  onSubmitupdateUserOrganization() {
    console.log('Insdie submit', this.organizationForm.value);
    console.log('this.organizationForm', this.organizationForm);
    console.log(
      'this.organizationForm.value.cell.number',
      this.organizationForm.value.cell.number
    );
    this.submittedOrganizationForm = true;
    if (this.organizationForm.valid) {
      const organization: any = {
        company_name: this.organizationForm.value.companyName,
        addressLineOne: this.organizationForm.value.addressLineOne,
        addressLineTwo: this.organizationForm.value.addressLineTwo,
        country: this.organizationForm.value.country,
        state: this.organizationForm.value.state,
        city: this.organizationForm.value.city,
        zipCode: this.organizationForm.value.zipCode,
        billing_contact: {
          billingCountry: this.organizationForm.value.billingCountry,
          billingState: this.organizationForm.value.billingState,
          billingCity: this.organizationForm.value.billingCity,
          billingZipCode: this.organizationForm.value.billingZipCode,
          name: this.organizationForm.value.name,
          email: this.organizationForm.value.email,
          phone: this.organizationForm.value.phone,
          cell: this.organizationForm.value.cell.number,
          billing_address_line_one: this.organizationForm.value
            .billingAddressLineOne,
          billing_address_line_two: this.organizationForm.value
            .billingAddressLineTwo,
          countryCode: this.organizationForm.value.cell.dialCode,
          countryISO: this.organizationForm.value.cell.countryCode,
        },
      };

      this._userService.updateOrganization(organization).subscribe(
        (res: any) => {
          console.log('create organization res', res);
          this.log.event_type = 'Organization updated';
          this.log.message = 'Organization updated successfully';
          console.log('this.log', this.log);
          this._logService.createLog(this.log).subscribe((res: any) => {
          });
          this._toastService.showToastr('Organization update successfully', '');

          // this.updateUser(res.organization_id);
          // this.activeModal.close();
        },
        (err: any) => {
          this.log.event_type = 'Organization not updated';
          this.log.message = 'Failed to update organization';
          this._logService.createLog(this.log).subscribe((res: any) => {
          });
        }
      );
    }
  }
  countries = [
    { id: 0, name: 'India' },
    { id: 1, name: 'USA' },
    { id: 2, name: 'Australia' },
  ];
}
