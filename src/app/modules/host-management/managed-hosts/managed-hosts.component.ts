import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { HostManagementService } from 'src/app/shared/shared-service/host-management-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { HttpClient } from '@angular/common/http';
import { AddNewHostComponent } from 'src/app/modals/add-new-host/add-new-host.component';
import { EditManagedHostComponent } from 'src/app/modals/edit-managed-host/edit-managed-host.component';
import { UserService } from 'src/app/shared/shared-service/user-service';
import { launchConsoleComponent } from 'src/app/modals/launch-console/launch-console.component';
import { HttpHeaders } from '@angular/common/http';

export interface PeriodicElement {
  host_name: string;
  site: string;
  host_type: string;
  serial_number: any;
  manufacture: string;
  model: string;
  status: string;
  action: string;
}
@Component({
  selector: 'managed-hosts',
  templateUrl: './managed-hosts.component.html',
  styleUrls: ['./managed-hosts.component.css'],
})
export class ManagedHostsComponent implements OnInit {
  displayedColumns: string[] = [
    'host_name',
    'site',
    'host_type',
    'serial_number',
    'manufacture',
    'model',
    'status',
    'action',
  ];
  log: any = {
    time: new Date().getTime(),
    email: localStorage.getItem('userEmail'),
    user_id: localStorage.getItem('user_id'),
    triggered_by: 'Login Page',
    severity: 'Informational',
  };
  dataSource: MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isLaunched: any[];
  accessHostDetails: any;
  disconnectSession: any;
  constructor(
    private _hostManagementService: HostManagementService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private _emitService: EmitService,
    private _toastService: ToastService,
    private _logService: LogService,
    private http: HttpClient,
    private _userService: UserService
  ) {
    this._emitService.listen().subscribe((m: any) => {
      console.log(m);
      this.updateManagesHostsDetails(m);
    });
    this.getIPAddress();
  }
  updateManagesHostsDetails(event) {
    this.getManagedHosts();
    console.log('Fire onFilterClick: ', event);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.getManagedHosts();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  getManagedHosts() {
    this.spinner.show();
    this._hostManagementService.getManagedHosts().subscribe((data: any) => {
      this.spinner.hide();
      console.log(data);
      console.log('Laps');
      this.dataSource.data = data;
      this.isLaunched = [];
      for (var i: number = 0; i < this.dataSource.data.length; i++) {
        console.log('isLaunched', this.isLaunched);
        console.log('isLaunched----i', this.isLaunched[i]);
        this.isLaunched[i] = false;
      }
      return data;
    });
  }
  openAddNewHost() {
    this.modalService.open(AddNewHostComponent, {
      scrollable: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'myCustomModalClass',
    });
  }
  onEditManagedHosts(element) {
    console.log('On edit managed hosts', element);
    const modalRef = this.modalService.open(EditManagedHostComponent, {
      scrollable: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'myCustomModalClass',
    });
    let data = {
      managedHostsInfo: element,
    };

    modalRef.componentInstance.fromManagedHostsComponent = data;
  }
  public user = {
    name: 'Izzat Nadiri',
    age: 26,
  };
  onOpenTerminal(element, index) {
    console.log('element', element);
    console.log('index', index);
    console.log('element.dongle.Appliance_id', element.dongle);
    if (element.dongle) {
      console.log('Inside if');
      this.showModal(element, this.log.email, index);
      // this.getUserandOrganization(element, this.log.email, index);
    } else {
      alert('No appliance connected');
      console.log('Inside else');
    }
  }

  showModal(res, userEmail, index) {
    console.log("show modal res", res)
    this.isLaunched[index] = true;
    this.accessHostDetails = res;
    const modalRef = this.modalService.open(launchConsoleComponent, {
      scrollable: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'myCustomModalClass',
    });
    const obj = {
      res: res,
      userEmail: userEmail,
      index: index
    }
    modalRef.componentInstance.element = obj;
    modalRef.result.then((result) => {
      console.log("result before", result)
      this.disconnectSession = result;
      if (result || result == 0) {
        console.log('result--', result);
        this.isLaunched[result] = false;
      }
    });
  }
  // getUserandOrganization(element, userEmail, index) {
  //   console.log('element', element);
  //   this._userService
  //     .getUserAndOrganization(userEmail)
  //     .subscribe((res: any) => {
  //       const requestDetails = {
  //         SourceIp: this.log.ip_address,
  //         FirstName: res.first_name,
  //         LastName: res.last_name,
  //         Email: res.email,
  //         Date_Time: new Date(),
  //         ApplianceID: element.dongle.Appliance_id,
  //         SerialNumber: element.dongle.dongle_serial,
  //       };
  //       // window.open(`http://localhost:8888?hostId=${element.id}`)
  //       this._hostManagementService
  //         .requestToAccessDevice(requestDetails, element)
  //         .subscribe(
  //           (res: any) => {
  //             this.isLaunched[index] = true;
  //             this.accessHostDetails = res;
  //             console.log('create site res============', res);
  //             window.open(
  //               `ssh://${res.username}:YEQwa8WLgHGYPTdE@${res.IP}:${res.port}`,
  //               '_blank'
  //             );
  //           },
  //           (err: any) => {
  //             alert('Failed to launch console please try again');
  //             console.log('request to access launch error', err);
  //           }
  //         );
  //     });
  // }
  
  disconnectHost(element, index, disconnectSession) {
    console.log("disconnectSession", disconnectSession)
    console.log('this.accessHostDetails', this.accessHostDetails);
    console.log('element', element);
    this._hostManagementService
      .disconnectHost(this.accessHostDetails, element, disconnectSession)
      .subscribe(
        (res: any) => {
          console.log('Res', res);
          this.isLaunched[index] = false;
        },
        (err: any) => {
          console.log('error', err.status);
          if(err.status == '200'){
            console.log("Inside if")
            this.isLaunched[index] = false;
          }
          else{
          alert("Session is not disconnected, please try again")
          }
          // this.isLaunched[index] = true;
        }
      );
  }
}