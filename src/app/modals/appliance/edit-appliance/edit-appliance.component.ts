import { Component, OnInit, Input } from '@angular/core';
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

// import * as data from '../../shared/shared-service/countryList.json';

@Component({
  selector: 'edit-appliance-modal',
  templateUrl: './edit-appliance.component.html',
  styleUrls: ['./edit-appliance.component.css'],
})
export class EditApplianceComponent implements OnInit {
  @Input() fromApplianceComponent;
  updateApplianceForm: FormGroup;
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
  applianceDetails: any;
  selectedOption: any;
  public min = new Date(2018, 3, 12, 10, 30);
  public max = new Date(2018, 3, 25, 20, 30);
  invalidDateTime1: Date;
  keyword = 'company_name';
  selectedOrganization: any;
  search_site = 'name';
  siteList: any;

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
    private _userService: UserService,

  ) {}

  ngOnInit() {
    this.selectedOption = this.countries[0];
    console.log('this.fromApplianceComponent', this.fromApplianceComponent);
    this.applianceDetails = this.fromApplianceComponent
  this.invalidDateTime1 = new Date(this.applianceDetails.applianceInfo.start_time);
    this.getIPAddress();
    const epochNow = new Date().getTime();
    this.current_time = epochNow;
    this.updateApplianceForm = this.fb.group({
      applianceName: ['', Validators.required],
      model: ['', Validators.required],
      firmware_version: ['', Validators.required],
      ipv4_address: ['', Validators.required],
      organization_id: ['', Validators.required],
      Site_id: ['', Validators.required]
      
    });
  }

  get updateApplianceFormControl() {
    return this.updateApplianceForm.controls;
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
  onUpdateAppliance() {
    console.log('Insdie submit', this.updateApplianceForm.value);
    console.log('this.updateApplianceForm', this.updateApplianceForm);

    this.submitted = true;
    if (this.updateApplianceForm.valid) {
      const applianceDetails = {
        name: this.updateApplianceForm.value.applianceName,
        model: this.updateApplianceForm.value.model,
        firmware_version: this.updateApplianceForm.value.firmware_version,
        ipv4_address: this.updateApplianceForm.value.ipv4_address,
        organization_id: this.updateApplianceForm.value.organization_id.id,
        Site_id: this.updateApplianceForm.value.Site_id.id,
        last_seen: new Date(),
        status: "Available",
      };
      this.spinner.show();
      this._sharkManagementService.updateAppliance(applianceDetails, this.applianceDetails.applianceInfo.id).subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log('create appliance res', res);
          this.log.event_type = 'Appliance updated';
          this.log.message = 'Appliance updated Successfully';
          console.log('this.log', this.log);
          this._logService.createLog(this.log).subscribe((res: any) => {});
          this._emitService.reloadOrganizationDetails('');
          this._toastService.showSuccessToastr(
            'Appliance updated successfully',
            ''
          );
          this.activeModal.close();
        },
        (err: any) => {
          console.log('error inside create new appliance', err.error);
          if (err.error == 'Validation error') {
            this._toastService.showErrorToastr(
              'Appliance already exist',
              ''
            );
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 3000);
          }
          this.log.event_type = 'Appliance not updated';
          this.log.message = 'Failed to create appliance';
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
  getOrganizationsList(event) {
    console.log('evenmt', event);
    this.isLoadingResult = true;

    this._userService.getOrganizationList().subscribe((data) => {
      this.data = data;
      console.log("organization list----", data)
      console.log("organization list", this.data)
      this.isLoadingResult = false;
    });
  }
  
  getOrganizationsListFilter(event) {
    this.isLoadingResult = true;

    this._userService.getOrganizationListFilter(event).subscribe((data) => {
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
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  countries = [
    { id: 0, name: 'India' },
    { id: 1, name: 'USA' },
    { id: 2, name: 'Australia' },
  ];
}
