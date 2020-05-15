import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { HostManagementService } from 'src/app/shared/shared-service/host-management-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { ConfirmDialogCOmponent } from 'src/app/modals/confirm-dialog/confirm-dialog.component';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { HttpClient } from '@angular/common/http';
import { AddNewHostComponent } from 'src/app/modals/add-new-host/add-new-host.component';
import { EditManagedHostComponent } from 'src/app/modals/edit-managed-host/edit-managed-host.component';

export interface PeriodicElement {
  host_name: string;
  host_type: string;
  description: string;
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
    'host_type',
    'description',
    'serial_number',
    'manufacture',
    'model',
    'status',
    'action'
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
  constructor(
    private _hostManagementService: HostManagementService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private _emitService: EmitService,
    private _toastService: ToastService,
    private _logService: LogService,
    private http: HttpClient
  ) {
    this._emitService.listen().subscribe((m: any) => {
      console.log(m);
      this.updateManagesHostsDetails(m);
    });
  }
  updateManagesHostsDetails(event) {
    this.getManagedHosts();
    console.log('Fire onFilterClick: ', event);
  }

  ngOnInit() {
    this.getIPAddress();
    this.spinner.show();
    this.dataSource = new MatTableDataSource();
    this.getManagedHosts();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getIPAddress() {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
      console.log(
        'ip address inside create new managed hosts',
        this.log.ip_address
      );
    });
  }
  getManagedHosts() {
    this.spinner.hide();
    this._hostManagementService.getManagedHosts().subscribe((data: any) => {
      console.log(data);
      console.log('Laps');
      this.dataSource.data = data;
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
  onOpenTerminal(element) {
    console.log("Element in side onOpenTerminal", element)
    
  }
}
