import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { HttpClient } from '@angular/common/http';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HostManagementService } from 'src/app/shared/shared-service/host-management-service';

// import * as data from '../../shared/shared-service/countryList.json';

@Component({
  selector: 'add-new-host-modal',
  templateUrl: './add-new-host.component.html',
  styleUrls: ['./add-new-host.component.css'],
})
export class AddNewHostComponent implements OnInit {
  managedHostForm: FormGroup;
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
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private _emitService: EmitService,
    private _hostManagementService: HostManagementService,
    private _toastService: ToastService,
    private http: HttpClient,
    private _logService: LogService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getIPAddress();
    const epochNow = new Date().getTime();
    this.current_time = epochNow;
    this.managedHostForm = this.fb.group({
      hostName: ['', Validators.required],
      hostType: ['', Validators.required],
      description: ['', Validators.required],
      serialNumber: ['', Validators.required],
      manufacture: ['', Validators.required],
      model: ['', Validators.required],
      status: ['', Validators.required],
      SiteId: ['', Validators.required]
    });
  }

  get managedHostFormControl() {
    return this.managedHostForm.controls;
  }
  getIPAddress() {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
      console.log(
        'ip address inside create new site',
        this.log.ip_address
      );
    });
  }
  onSubmit() {
    console.log('Insdie submit', this.managedHostForm.value);
    console.log('this.managedHostForm', this.managedHostForm);

    this.submitted = true;
    if (this.managedHostForm.valid) {
      const managedHosts = {
        host_name: this.managedHostForm.value.hostName,
        host_type: this.managedHostForm.value.hostType,
        description: this.managedHostForm.value.description,
        serial_number: this.managedHostForm.value.serialNumber,
        manufacture: this.managedHostForm.value.manufacture,
        model: this.managedHostForm.value.model,
        status: this.managedHostForm.value.status,
        site_id: this.managedHostForm.value.SiteId
      };
      // const log_details = {
      //   triggered_by: this.routes.url.split('?')[0],
      //   email_id: this.userEmail,
      //   user_id: this.user_id,
      //   time: this.current_time,
      // };
      this.spinner.show();
      this._hostManagementService.createHost(managedHosts).subscribe(
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
