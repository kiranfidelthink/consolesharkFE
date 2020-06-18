import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { HttpClient } from '@angular/common/http';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomvalidationService } from 'src/app/shared/shared-service/customValidation.service';
import { SharkManagementService } from 'src/app/shared/shared-service/shark-management-services';
import { UserService } from 'src/app/shared/shared-service/user-service';

// import * as data from '../../shared/shared-service/countryList.json';

@Component({
  selector: 'edit-dongle-modal',
  templateUrl: './edit-dongle.component.html',
  styleUrls: ['./edit-dongle.component.css'],
})
export class EditDongleComponent implements OnInit {
  @Input() fromDongleComponent;
  updateDongleForm: FormGroup;
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
  dongleDetails: any;
  selectedOption: any;
  public min = new Date(2018, 3, 12, 10, 30);
  public max = new Date(2018, 3, 25, 20, 30);
  invalidDateTime1: Date;
  keyword = 'company_name';
  selectedOrganization: any;
  search_host = 'name';
  search_site = 'name';
  search_appliance = 'name';
  hostList: any;
  siteList: any;
  startDate: any;
  endDate: any;
  applianceList: any;
  selectedBaud: any;
  selectedDataBits: any;
  selectedParity: any;
  selectedStopBits: any;
  selectedDtrDsr: any;
  selectedRtsCts: any;
  selectedXonXoff: any;

  // public invalidDateTime1 = new Date(2018, 3, 26, 20, 30);

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
    private _userService: UserService
  ) {}

  ngOnInit() {
    console.log('this.fromDongleComponent', this.fromDongleComponent);
    this.dongleDetails = this.fromDongleComponent;
    this.startDate = new Date(this.dongleDetails.dongleInfo.licence.Assigned);
    this.endDate = new Date(this.dongleDetails.dongleInfo.licence.Expires);
    console.log(
      'this.dongleDetails.dongleInfo.parameters',
      this.dongleDetails.dongleInfo
    );
    this.onDefaultSelectBaud(this.dongleDetails.dongleInfo.parameters.baud);
    this.onDefaultSelectDataBits(
      this.dongleDetails.dongleInfo.parameters.data_bits
    );
    this.onDefaultSelectParity(
      this.dongleDetails.dongleInfo.parameters.parity);
    this.onDefaultSelectStopBits(
      this.dongleDetails.dongleInfo.parameters.stop_bits
    );
    this.onDefaultSelectDtrDrs(
      this.dongleDetails.dongleInfo.parameters.dtr_dsr
    );
    this.onDefaultSelectRtsCts(
      this.dongleDetails.dongleInfo.parameters.rts_cts
    );
    this.onDefaultSelectXonXoff(
      this.dongleDetails.dongleInfo.parameters.xon_xoff
    );

    this.getIPAddress();
    const epochNow = new Date().getTime();
    this.current_time = epochNow;
    this.updateDongleForm = this.fb.group({
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

  get updateDongleFormControl() {
    return this.updateDongleForm.controls;
  }
  getIPAddress() {
    this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
      console.log('ip address inside create new dongle', this.log.ip_address);
    });
  }
  onUpdateDongle() {
    console.log('Insdie submit', this.updateDongleForm.value);
    console.log('this.updateDongleForm', this.updateDongleForm);

    this.submitted = true;
    if (this.updateDongleForm.valid) {
      const dongleDetails = {
        Site_id: this.updateDongleForm.value.siteId.id,
        Appliance_id: this.updateDongleForm.value.applianceId.id,
        Host_id: this.updateDongleForm.value.hostId.id,
        organization_id: localStorage.getItem('organization_id'),
        licence: {
          Assigned: this.updateDongleForm.value.startDate,
          Expires: this.updateDongleForm.value.endDate,
        },
        status: 'Plugged In',
        mfg_date: new Date(),
        parameters: {
          baud: this.updateDongleForm.value.baud,
          data_bits: this.updateDongleForm.value.data_bits,
          parity: this.updateDongleForm.value.parity,
          stop_bits: this.updateDongleForm.value.stop_bits,
          dtr_dsr: this.updateDongleForm.value.dtr_dsr,
          rts_cts: this.updateDongleForm.value.rts_cts,
          xon_xoff: this.updateDongleForm.value.xon_xoff,
        },
        // firmware_version: this.updateDongleForm.value.firmware_version,
        // ipv4_address: this.updateDongleForm.value.ipv4_address,
        // organization_id: this.updateDongleForm.value.organization_id.id,
        // Site_id: this.updateDongleForm.value.Site_id.id,
        // last_seen: new Date(),
        // status: "Available",
      };
      this.spinner.show();
      this._sharkManagementService
        .updateDongle(dongleDetails, this.dongleDetails.dongleInfo.id)
        .subscribe(
          (res: any) => {
            this.spinner.hide();
            console.log('create dongle res', res);
            this.log.event_type = 'Dongle updated';
            this.log.message = 'Dongle updated Successfully';
            console.log('this.log', this.log);
            this._logService.createLog(this.log).subscribe((res: any) => {});
            this._emitService.reloadOrganizationDetails('');
            this._toastService.showSuccessToastr(
              'Dongle updated successfully',
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
            this.log.event_type = 'Dongle not updated';
            this.log.message = 'Failed to create dongle';
            this._logService.createLog(this.log).subscribe((res: any) => {});
          }
        );
    }
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
  getHostList(event) {
    console.log('evenmt', event);
    this.isLoadingResult = true;

    this._userService.getHostList().subscribe((data) => {
      this.hostList = data;
      console.log('organization list----', data);
      console.log('organization list', this.hostList);
      this.isLoadingResult = false;
    });
  }

  getHostListFilter(event) {
    this.isLoadingResult = true;
    this._userService.getHostListFilter(event).subscribe((data) => {
      this.hostList = data;
      this.isLoadingResult = false;
    });
  }
  getApplianceList(event) {
    console.log('evenmt', event);
    this.isLoadingResult = true;

    this._userService.getApplianceList().subscribe((data) => {
      this.applianceList = data;
      console.log('appliance list----', data);
      console.log('appliance list', this.applianceList);
      this.isLoadingResult = false;
    });
  }

  getApplianceListFilter(event) {
    this.isLoadingResult = true;
    this._userService.getApplianceListFilter(event).subscribe((data) => {
      this.applianceList = data;
      this.isLoadingResult = false;
    });
  }
  selectEvent(item) {
    console.log('item', item);
    this.selectedOrganization = item;
  }

  onChangeSearch(val: string) {
    console.log('val', val);
  }

  onFocused(e) {}
  onInputClear(e) {
    console.log('========', e);
    this.selectedOrganization = '';
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
  onDefaultSelectBaud(baud) {
    this.selectedBaud = null;
    for (var i = 0; i < this.baud.length; i++) {
      if (this.baud[i].id == baud.id) {
        this.selectedBaud = this.baud[i];
      }
    }
  }
  onDefaultSelectDataBits(data_bits) {
    this.selectedDataBits = null;
    for (var i = 0; i < this.data_bits.length; i++) {
      if (this.data_bits[i].id == data_bits.id) {
        this.selectedDataBits = this.data_bits[i];
      }
    }
  }
  onDefaultSelectParity(parity) {
    this.selectedParity = null;
    for (var i = 0; i < this.parity.length; i++) {
      if (this.parity[i].id == parity.id) {
        this.selectedParity = this.parity[i];
      }
    }
  }
  onDefaultSelectStopBits(stop_bits) {
    this.selectedStopBits = null;
    for (var i = 0; i < this.stop_bits.length; i++) {
      if (this.stop_bits[i].id == stop_bits.id) {
        this.selectedStopBits = this.stop_bits[i];
      }
    }
  }
  onDefaultSelectDtrDrs(dtr_dsr) {
    this.selectedDtrDsr = null;
    for (var i = 0; i < this.dtr_dsr.length; i++) {
      if (this.dtr_dsr[i].id == dtr_dsr.id) {
        this.selectedDtrDsr = this.dtr_dsr[i];
      }
    }
  }
  onDefaultSelectRtsCts(rts_cts) {
    this.selectedRtsCts = null;
    for (var i = 0; i < this.rts_cts.length; i++) {
      if (this.rts_cts[i].id == rts_cts.id) {
        this.selectedRtsCts = this.rts_cts[i];
      }
    }
  }
  onDefaultSelectXonXoff(xon_xoff) {
    this.selectedXonXoff = null;
    for (var i = 0; i < this.xon_xoff.length; i++) {
      if (this.xon_xoff[i].id == xon_xoff.id) {
        this.selectedXonXoff = this.xon_xoff[i];
      }
    }
  }
}
