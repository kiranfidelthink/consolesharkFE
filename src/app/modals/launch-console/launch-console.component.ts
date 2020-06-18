import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/shared/shared-service/user-service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HostManagementService } from 'src/app/shared/shared-service/host-management-service';
// import * as data from '../../shared/shared-service/countryList.json';

@Component({
  selector: 'launch-console-modal',
  templateUrl: './launch-console.component.html',
  styleUrls: ['./launch-console.component.css'],
})
export class launchConsoleComponent implements OnInit {
  @Input() public element;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  requestStatus: string;
  log: any = {
    time: new Date().getTime(),
    email: localStorage.getItem('userEmail'),
    user_id: localStorage.getItem('user_id'),
    triggered_by: 'Login Page',
    severity: 'Informational',
  };
  constructor(
    public activeModal: NgbActiveModal,
    private _userService: UserService,
    private http: HttpClient,
    private _hostManagementService: HostManagementService
  ) {}

  ngOnInit() {
    this.getIPAddress();
    this.requestStatus = 'requested';
    console.log('this.element----', this.element);
    console.log('this.element.res.id', this.element.res.id);
    if (this.element.res) {
      this.getUserandOrganization(this.element);
    }
  }

  // onConfirm(value) {
  //   this.activeModal.close(value);
  // }
  // onConfirm(value){
  //   console.log("value", value)
  //   this.activeModal.close(value)
  // }
  closeModal(sendData) {
    console.log("on click close modal", sendData)
    this.activeModal.close(sendData);
  }

  // getUserandOrganization(element, userEmail, index) {
  getUserandOrganization(element) {
    console.log('element inside getUserAndOrganization', element);
    this._userService
      .getUserAndOrganization(element.userEmail)
      .subscribe((res: any) => {
        const requestDetails = {
          SourceIp: this.log.ip_address,
          FirstName: res.first_name,
          LastName: res.last_name,
          Email: res.email,
          Date_Time: new Date(),
          ApplianceID: element.res.dongle.Appliance_id,
          SerialNumber: element.res.dongle.dongle_serial,
        };
        // window.open(`http://localhost:8888?hostId=${element.id}`)
        this._hostManagementService
          .requestToAccessDevice(requestDetails, this.element.res)
          .subscribe(
            (res: any) => {
              this.requestStatus = 'ready';
              setTimeout(() => {
                console.log('create site res============', res);
                window.open(
                  `ssh://${res.username}:${res.private_key}@${res.IP}:${res.port}`,
                  '_blank'
                );
                this.activeModal.close(res);
              }, 3000);
            },
            (err: any) => {
              alert('Failed to launch console please try again');
              this.activeModal.close(this.element.index);
              console.log('request to access launch error', err);
            }
          );
      });
  }

  getIPAddress() {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    this.http
      .get('https://api.ipify.org/?format=json', { headers: header })
      .subscribe((res: any) => {
        console.log('=------', res);
        this.log.ip_address = res.ip;
        console.log(
          'ip address inside create new managed hosts',
          this.log.ip_address
        );
      });
  }
}
