import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { HttpClient } from '@angular/common/http';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HostManagementService } from 'src/app/shared/shared-service/host-management-service';
import { UserService } from 'src/app/shared/shared-service/user-service';

// import * as data from '../../shared/shared-service/countryList.json';

@Component({
  selector: 'edit-managed-host-modal',
  templateUrl: './edit-managed-host.component.html',
  styleUrls: ['./edit-managed-host.component.css'],
})
export class EditManagedHostComponent implements OnInit {
  @Input() fromManagedHostsComponent;
  updateManagedHostForm: FormGroup;
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
  hostDetails: any;
  selectedOption: any;
  search_site = 'name';
  siteList: any;
  selectedSite: any;
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private _emitService: EmitService,
    private _hostManagementService: HostManagementService,
    private _toastService: ToastService,
    private http: HttpClient,
    private _logService: LogService,
    private spinner: NgxSpinnerService,
    private _userService: UserService,

  ) {}

  ngOnInit() {
    this.selectedOption = this.countries[0];
    console.log('this.fromManagedHostsComponent', this.fromManagedHostsComponent);
    this.hostDetails = this.fromManagedHostsComponent
    this.getIPAddress();
    const epochNow = new Date().getTime();
    this.current_time = epochNow;
    this.updateManagedHostForm = this.fb.group({
      name: ['', Validators.required],
      hostType: ['', Validators.required],
      serialNumber: ['', Validators.required],
      manufacture: ['', Validators.required],
      model: ['', Validators.required],
      siteId: ['', Validators.required],
    });
  }

  get updateManagedHostFormControl() {
    return this.updateManagedHostForm.controls;
  }
  getIPAddress() {
    this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
      console.log(
        'ip address inside create new Host',
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
  onUpdateHost() {
    console.log('Insdie submit', this.updateManagedHostForm.value);
    console.log('this.updateManagedHostForm', this.updateManagedHostForm);

    this.submitted = true;
    if (this.updateManagedHostForm.valid) {
      const hostDetails = {
        name: this.updateManagedHostForm.value.name,
        host_type: this.updateManagedHostForm.value.hostType,
        serial_number: this.updateManagedHostForm.value.serialNumber,
        manufacture: this.updateManagedHostForm.value.manufacture,
        model: this.updateManagedHostForm.value.model,
        status: "Available",
        Site_id: this.updateManagedHostForm.value.siteId.id,
        organization_id: localStorage.getItem('organization_id')
      };
      this.spinner.show();
      this._hostManagementService.updateHost(hostDetails, this.hostDetails.managedHostsInfo.id).subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log('create Host res', res);
          this.log.event_type = 'Host updated';
          this.log.message = 'Host updated Successfully';
          console.log('this.log', this.log);
          this._logService.createLog(this.log).subscribe((res: any) => {});
          this._emitService.reloadOrganizationDetails('');
          this._toastService.showSuccessToastr(
            'Host updated successfully',
            ''
          );
          this.activeModal.close();
        },
        (err: any) => {
          console.log('error inside create new Host', err.error);
          if(err.error == 'insert or update on table "host" violates foreign key constraint "host_Site_id_fkey"'){
            this._toastService.showErrorToastr('Invalid Site Id','');
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 3000);
          }
          if (err.error == 'Validation error') {
            this._toastService.showErrorToastr(
              'Host already exist',
              ''
            );
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 3000);
          }
          this.log.event_type = 'Host not updated';
          this.log.message = 'Failed to create Host';
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
