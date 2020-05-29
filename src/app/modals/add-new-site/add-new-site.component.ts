import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { HttpClient } from '@angular/common/http';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HostManagementService } from 'src/app/shared/shared-service/host-management-service';
import { CustomvalidationService } from 'src/app/shared/sharedService/customValidation.service';

// import * as data from '../../shared/shared-service/countryList.json';

@Component({
  selector: 'add-new-site-modal',
  templateUrl: './add-new-site.component.html',
  styleUrls: ['./add-new-site.component.css'],
})
export class AddNewSiteComponent implements OnInit {
  siteForm: FormGroup;
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
  time = {hour: 13, minute: 30};
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private _emitService: EmitService,
    private _hostManagementService: HostManagementService,
    private _toastService: ToastService,
    private http: HttpClient,
    private _logService: LogService,
    private spinner: NgxSpinnerService,
    private customValidator: CustomvalidationService,
  ) {}

  ngOnInit() {
    this.getIPAddress();
    const epochNow = new Date().getTime();
    this.current_time = epochNow;
    this.siteForm = this.fb.group({
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

  get siteFormControl() {
    return this.siteForm.controls;
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
  onSubmit() {
    console.log('Insdie submit', this.siteForm.value);
    console.log('this.siteForm', this.siteForm);

    this.submitted = true;
    if (this.siteForm.valid) {
      const siteDetails = {
        name: this.siteForm.value.siteName,
        addressLineOne: this.siteForm.value.addressLineOne,
        addressLineTwo: this.siteForm.value.addressLineTwo,
        country: this.siteForm.value.country,
        state: this.siteForm.value.state,
        city: this.siteForm.value.city,
        zipCode: this.siteForm.value.zipCode,
        organization_id: localStorage.getItem('organization_id'),
        site_contact:{
          phone:this.siteForm.value.sitePersonContactNumber,
          name:this.siteForm.value.sitePersonName,
          position:this.siteForm.value.sitePersonposition
        },
        start_time: this.siteForm.value.startDate,
        end_time: this.siteForm.value.endDate,
        // start_time: Math.round(new Date(this.siteForm.value.startDate).getTime()/1000),
        // end_time: Math.round(new Date(this.siteForm.value.endDate).getTime()/1000),
        latitude: this.siteForm.value.latitude,
        longitude: this.siteForm.value.longitude
      };
      // const log_details = {
      //   triggered_by: this.routes.url.split('?')[0],
      //   email_id: this.userEmail,
      //   user_id: this.user_id,
      //   time: this.current_time,
      // };
      this.spinner.show();
      this._hostManagementService.createSite(siteDetails).subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log('create site res', res);
          this.log.event_type = 'Site created';
          this.log.message = 'Site created Successfully';
          console.log('this.log', this.log);
          this._logService.createLog(this.log).subscribe((res: any) => {});
          this._emitService.reloadOrganizationDetails('');
          this._toastService.showSuccessToastr(
            'Site created successfully',
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
          this.log.event_type = 'Site not created';
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
