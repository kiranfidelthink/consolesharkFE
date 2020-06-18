import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { HttpClient } from '@angular/common/http';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HostManagementService } from 'src/app/shared/shared-service/host-management-service';
import { CustomvalidationService } from 'src/app/shared/shared-service/customValidation.service';

// import * as data from '../../shared/shared-service/countryList.json';

@Component({
  selector: 'edit-site-modal',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.css'],
})
export class EditSiteComponent implements OnInit {
  @Input() fromSiteComponent;
  updateSiteForm: FormGroup;
  submitted = false;
  ipAddress = '';
  current_time: number;
  log: any = {
    time: new Date().getTime(),
    email: localStorage.getItem('userEmail'),
    user_id: localStorage.getItem('user_id'),
    triggered_by: 'Login Page',
    severity: 'Informational',
  };
  isLoadingResult: boolean;
  data: any;
  userEmail: any;
  user_id: any;
  siteDetails: any;
  selectedOption: any;
  public min = new Date(2018, 3, 12, 10, 30);
  public max = new Date(2018, 3, 25, 20, 30);
  invalidDateTime1: Date;
  selectedCountry: any;
  // public invalidDateTime1 = new Date(2018, 3, 26, 20, 30);

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private _emitService: EmitService,
    private _hostManagementService: HostManagementService,
    private _toastService: ToastService,
    private http: HttpClient,
    private _logService: LogService,
    private spinner: NgxSpinnerService,
    private customValidator: CustomvalidationService
  ) {}

  ngOnInit() {
    this.selectedOption = this.countries[0];
    console.log('this.fromSiteComponent', this.fromSiteComponent);
    this.siteDetails = this.fromSiteComponent
    this.onDefaultSelectCountry(this.siteDetails.siteInfo.country);
  this.invalidDateTime1 = new Date(this.siteDetails.siteInfo.start_time);
    this.getIPAddress();
    const epochNow = new Date().getTime();
    this.current_time = epochNow;
    this.updateSiteForm = this.fb.group({
      siteName: ['', Validators.required],
      addressLineOne: ['', Validators.required],
      addressLineTwo: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      sitePersonName: ['', Validators.required],
      sitePersonposition: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      sitePersonContactNumber: [
        '',
        Validators.compose([
          Validators.required,
          this.customValidator.contactPatternValidator(),
        ]),
      ],
    });
  }
  onDefaultSelectCountry(countryId) { 
    this.selectedCountry = null;
    for (var i = 0; i < this.countries.length; i++)
    {
      if (this.countries[i].id == countryId.id) {
        this.selectedCountry = this.countries[i];
      }
    }
}
  get updateSiteFormControl() {
    return this.updateSiteForm.controls;
  }
  getIPAddress() {
    this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
      console.log(
        'ip address inside create new site',
        this.log.ip_address
      );
    });
  }
  onUpdateSite() {
    console.log('Insdie submit', this.updateSiteForm.value);
    console.log('this.updateSiteForm', this.updateSiteForm);

    this.submitted = true;
    if (this.updateSiteForm.valid) {
      const siteDetails = {
        name: this.updateSiteForm.value.siteName,
        addressLineOne: this.updateSiteForm.value.addressLineOne,
        addressLineTwo: this.updateSiteForm.value.addressLineTwo,
        country: this.updateSiteForm.value.country,
        state: this.updateSiteForm.value.state,
        city: this.updateSiteForm.value.city,
        zipCode: this.updateSiteForm.value.zipCode,
        organization_id: localStorage.getItem('organization_id'),
        site_contact:{
          phone:this.updateSiteForm.value.sitePersonContactNumber,
          name:this.updateSiteForm.value.sitePersonName,
          position:this.updateSiteForm.value.sitePersonposition
        },
        start_time: this.updateSiteForm.value.startDate,
        end_time: this.updateSiteForm.value.endDate,
        latitude: this.updateSiteForm.value.latitude,
        longitude: this.updateSiteForm.value.longitude
      };
      this.spinner.show();
      this._hostManagementService.updateSite(siteDetails, this.siteDetails.siteInfo.id).subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log('create site res', res);
          this.log.event_type = 'Site updated';
          this.log.message = 'Site updated Successfully';
          console.log('this.log', this.log);
          this._logService.createLog(this.log).subscribe((res: any) => {});
          this._emitService.reloadOrganizationDetails('');
          this._toastService.showSuccessToastr(
            'Site updated successfully',
            ''
          );
          this.activeModal.close();
        },
        (err: any) => {
          console.log('error inside create new site', err.error);
          if (err.error == 'Validation error') {
            this._toastService.showErrorToastr(
              'Site already exist',
              ''
            );
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 3000);
          }
          this.log.event_type = 'Site not updated';
          this.log.message = 'Failed to create site';
          this._logService.createLog(this.log).subscribe((res: any) => {});
        }
      );
    }
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  countries = [
    { id: 0, name: 'India' },
    { id: 1, name: 'USA' },
    { id: 2, name: 'Australia' },
  ];
}
