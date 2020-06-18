import { Component, OnInit } from '@angular/core';
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
import { HostManagementService } from 'src/app/shared/shared-service/host-management-service';

// import * as data from '../../shared/shared-service/countryList.json';

@Component({
  selector: 'add-appliance-modal',
  templateUrl: './add-appliance.component.html',
  styleUrls: ['./add-appliance.component.css'],
})
export class AddNewApplianceComponent implements OnInit {
  applianceForm: FormGroup;
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
  search_site = 'name';
  selectedOrganization: any;
  siteList: any;
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
    this.applianceForm = this.fb.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      firmware_version: ['', Validators.required],
      // ipv4_address: ['', Validators.required],
      ipv4_address: [
        '',
        Validators.compose([
          Validators.required,
          this.customValidator.ipAddressValidator(),
        ]),
      ],
      Site_id: ['', Validators.required]
    });
  }

  get applianceFormControl() {
    return this.applianceForm.controls;
  }
  getIPAddress() {
    this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
      console.log(
        'ip address inside create new appliance',
        this.log.ip_address
      );
    });
  }
  getSiteList(event) {
    console.log('evenmt', event);
    this.isLoadingResult = true;
    this._userService.getSiteList().subscribe((data: any) => {
      this.siteList = data;
      console.log("site list----", data)
      console.log("site list", this.siteList)
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
  onSubmit() {
    console.log('Insdie submit', this.applianceForm.value);
    console.log('this.applianceForm', this.applianceForm);

    this.submitted = true;
    if (this.applianceForm.valid) {
      const applianceDetails = {
        name: this.applianceForm.value.name,
        model: this.applianceForm.value.model,
        firmware_version: this.applianceForm.value.firmware_version,
        ipv4_address: this.applianceForm.value.ipv4_address,
        organization_id: localStorage.getItem('organization_id'),
        Site_id: this.applianceForm.value.Site_id.id,
        last_seen: new Date(),
        status: "Available",
      };
      // const log_details = {
      //   triggered_by: this.routes.url.split('?')[0],
      //   email_id: this.userEmail,
      //   user_id: this.user_id,
      //   time: this.current_time,
      // };
      this.spinner.show();
      this._sharkManagementService.createAppliance(applianceDetails).subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log('create appliance res', res);
          this.log.event_type = 'Appliance created';
          this.log.message = 'Appliance created Successfully';
          console.log('this.log', this.log);
          this._logService.createLog(this.log).subscribe((res: any) => {});
          this._emitService.reloadOrganizationDetails('');
          this._toastService.showSuccessToastr(
            'Appliance created successfully',
            ''
          );
          this.activeModal.close();
        },
        (err: any) => {
          console.log('error inside create new appliance', err.error);
          if (err.error == 'Validation error') {
            this._toastService.showErrorToastr('Appliance already exist', '');
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 3000);
          }
          this.log.event_type = 'Appliance not created';
          this.log.message = 'Failed to create appliance';
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
