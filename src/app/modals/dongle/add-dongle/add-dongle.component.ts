import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { HttpClient } from '@angular/common/http';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomvalidationService } from 'src/app/shared/sharedService/customValidation.service';
import { SharkManagementService } from 'src/app/shared/shared-service/shark-management-services';
import { UserService } from 'src/app/shared/shared-service/user-service';
import { HostManagementService } from 'src/app/shared/shared-service/host-management-service';

// import * as data from '../../shared/shared-service/countryList.json';

@Component({
  selector: 'add-dongle-modal',
  templateUrl: './add-dongle.component.html',
  styleUrls: ['./add-dongle.component.css'],
})
export class AddNewDongleComponent implements OnInit {
  dongleForm: FormGroup;
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
  time = { hour: 13, minute: 30 };
  keyword = 'company_name';
  search_host = 'name';
  search_site = 'name';
  search_appliance = 'name';
  hostList: any;
  siteList: any;
  applianceList: any;
  selectedSite: any;
  startDate = new Date();
  endDate = new Date();
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private _emitService: EmitService,
    private _sharkManagementService: SharkManagementService,
    private _toastService: ToastService,
    private http: HttpClient,
    private _logService: LogService,
    private spinner: NgxSpinnerService,
    private customValidator: CustomvalidationService,
    private _userService: UserService,
    private _hostManagementService: HostManagementService
  ) {}

  ngOnInit() {
    this.getIPAddress();
    const epochNow = new Date().getTime();
    this.current_time = epochNow;
    this.dongleForm = this.fb.group({
      hostId: ['', Validators.required],
      siteId: ['', Validators.required],
      applianceId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      baud: ['', Validators.required],
      data_bits: ['', Validators.required],
      parity: ['', Validators.required],
      stop_bits: ['', Validators.required],
      dtr_dsr: ['', Validators.required],
      rts_cts: ['', Validators.required],
      xon_xoff: ['', Validators.required],
    });
  }

  get dongleFormControl() {
    return this.dongleForm.controls;
  }
  getIPAddress() {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
      console.log('ip address inside create new dongle', this.log.ip_address);
    });
  }
  getHostList(event) {
    console.log('evenmt', event);
    this.isLoadingResult = true;
    this._userService.getHostList().subscribe((data: any) => {
      this.hostList = data;
      console.log('site list----', data);
      console.log('site list', this.hostList);
      this.isLoadingResult = false;
    });
  }
  getHostListFilter(event) {
    this.isLoadingResult = true;

    this._userService.getHostListFilter(event).subscribe((data) => {
      this.data = data;
      this.isLoadingResult = false;
    });
  }
  getSiteList(event) {
    console.log('evenmt', event);
    this.isLoadingResult = true;
    this._userService.getSiteList().subscribe((data: any) => {
      this.siteList = data;
      console.log('site list----', data);
      console.log('site list', this.siteList);
      this.isLoadingResult = false;
    });
  }
  getSiteListFilter(event) {
    this.isLoadingResult = true;

    this._userService.getSiteListFilter(event).subscribe((data) => {
      this.data = data;
      this.isLoadingResult = false;
    });
  }
  getApplianceList(event) {
    console.log('evenmt', event);
    this.isLoadingResult = true;
    this._userService.getApplianceList().subscribe((data: any) => {
      this.applianceList = data;
      console.log('site list----', data);
      console.log('site list', this.applianceList);
      this.isLoadingResult = false;
    });
  }
  getApplianceListFilter(event) {
    this.isLoadingResult = true;

    this._userService.getApplianceListFilter(event).subscribe((data) => {
      this.data = data;
      this.isLoadingResult = false;
    });
  }
  selectEvent(item) {
    console.log('item', item);
    this.selectedSite = item;
  }

  onChangeSearch(val: string) {
    console.log('val', val);
  }

  onFocused(e) {}
  onInputClear(e) {
    console.log('========', e);
    this.selectedSite = '';
  }
  onSubmit() {
    console.log('Insdie submit', this.dongleForm.value);
    console.log('this.dongleForm', this.dongleForm);

    this.submitted = true;
    if (this.dongleForm.valid) {
      const dongleDetails = {
        Site_id: this.dongleForm.value.siteId.id,
        Appliance_id: this.dongleForm.value.applianceId.id,
        Host_id: this.dongleForm.value.hostId.id,
        organization_id: localStorage.getItem('organization_id'),
        licence: {
          Assigned: this.dongleForm.value.startDate,
          Expires: this.dongleForm.value.endDate,
        },
        status: 'Plugged In',
        mfg_date: new Date(),
        parameters: {
          baud: this.dongleForm.value.baud,
          data_bits: this.dongleForm.value.data_bits,
          parity: this.dongleForm.value.parity,
          stop_bits: this.dongleForm.value.stop_bits,
          dtr_dsr: this.dongleForm.value.dtr_dsr,
          rts_cts: this.dongleForm.value.rts_cts,
          xon_xoff: this.dongleForm.value.xon_xoff,
        },
      };
      // const log_details = {
      //   triggered_by: this.routes.url.split('?')[0],
      //   email_id: this.userEmail,
      //   user_id: this.user_id,
      //   time: this.current_time,
      // };
      console.log('dongle-details', dongleDetails);
      this.spinner.show();
      this._sharkManagementService.createDongle(dongleDetails).subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log('create dongle res', res);
          this.log.event_type = 'Dongle created';
          this.log.message = 'Dongle created Successfully';
          console.log('this.log', this.log);
          this._logService.createLog(this.log).subscribe((res: any) => {});
          this._emitService.reloadOrganizationDetails('');
          this._toastService.showSuccessToastr(
            'Dongle created successfully',
            ''
          );
          this.activeModal.close();
        },
        (err: any) => {
          console.log('error inside create new dongle', err.error);
          if (err.error == 'Validation error') {
            this._toastService.showErrorToastr('Dongle already exist', '');
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 3000);
          }
          this.log.event_type = 'Dongle not created';
          this.log.message = 'Failed to create dongle';
          this._logService.createLog(this.log).subscribe((res: any) => {});
        }
      );
    }
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  baud = [
    { id: 0, value: '9600' },
    { id: 1, value: '115200' },
  ];
  data_bits = [
    { id: 0, value: '5' },
    { id: 1, value: '6' },
    { id: 2, value: '7' },
    { id: 3, value: '8' },
  ];
  parity = [
    { id: 0, value: 'None' },
    { id: 1, value: 'odd' },
    { id: 2, value: 'even' },
    { id: 3, value: 'mark' },
    { id: 4, value: 'space' },
  ];
  stop_bits = [
    { id: 0, value: '1' },
    { id: 1, value: '1.5' },
    { id: 2, value: '2' },
  ];
  dtr_dsr = [
    { id: 0, value: 'On' },
    { id: 1, value: 'Off' },
  ];
  rts_cts = [
    { id: 0, value: 'On' },
    { id: 1, value: 'Off' },
  ];
  xon_xoff = [
    { id: 0, value: 'On' },
    { id: 1, value: 'Off' },
  ];
}
