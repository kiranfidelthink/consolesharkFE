import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditApplianceComponent } from 'src/app/modals/appliance/edit-appliance/edit-appliance.component';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { AddNewApplianceComponent } from 'src/app/modals/appliance/add-appliance/add-appliance.component';
import { ConfirmDialogCOmponent } from 'src/app/modals/confirm-dialog/confirm-dialog.component';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { HttpClient } from '@angular/common/http';
import { SharkManagementService } from 'src/app/shared/shared-service/shark-management-services';

export interface PeriodicElement {
  name: string;
  model: string;
  appliance_serial: string;
  ipv4_address: string;
  Site_id: string;
  firmware_version: string;
  added: string;
  last_seen: string;
  status: string;
  action: string;
}

@Component({
  selector: 'appliance',
  templateUrl: './appliance.component.html',
  styleUrls: ['./appliance.component.css'],
})
export class ApplianceComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'model',
    'appliance_serial',
    'ipv4_address',
    'Site_id',
    'firmware_version',
    'added',
    'last_seen',
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
    private _sharkManagementService: SharkManagementService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private _emitService: EmitService,
    private _toastService: ToastService,
    private _logService: LogService,
    private http: HttpClient
  ) {
    this._emitService.listen().subscribe((m: any) => {
      console.log(m);
      this.updateAppliancesDetails(m);
    });
  }
  updateAppliancesDetails(event) {
    this.getAppliances();
    console.log('Fire onFilterClick: ', event);
  }

  ngOnInit() {
    this.getIPAddress();
    // this.spinner.show();
    this.dataSource = new MatTableDataSource();
    this.getAppliances();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getIPAddress() {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
      console.log(
        'ip address inside create new appliance',
        this.log.ip_address
      );
    });
  }
  getAppliances() {
    this._sharkManagementService.getAppliances().subscribe((data: any) => {
      this.spinner.hide();
      console.log(data);
      console.log('Laps');
      this.dataSource.data = data;
      return data;
    });
  }
  openPopup() {
    this.modalService.open(AddNewApplianceComponent, {
      scrollable: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'myCustomModalClass',
    });
  }
  onEditAppliance(element) {
    console.log('On edit appliance', element);
    const modalRef = this.modalService.open(EditApplianceComponent, {
      scrollable: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'myCustomModalClass',
    });
    let data = {
      applianceInfo: element,
    };

    modalRef.componentInstance.fromApplianceComponent = data;
  }
  public user = {
    name: 'Izzat Nadiri',
    age: 26,
  };
  onDeleteAppliance(element) {
    console.log("Insid edelete applicane", element)
    element.module = "Appliance";
    const modalRef = this.modalService.open(ConfirmDialogCOmponent);
    modalRef.componentInstance.element = element;
    modalRef.result.then((result) => {
      if (result) {
        console.log('result--', result);
        this._sharkManagementService
          .deleteAppliance(element.id)
          .subscribe((res: any) => {
            this.log.event_type = 'Appliance deleted';
            this.log.message = 'Appliance deleted Successfully';
            this._logService.createLog(this.log).subscribe((res: any) => {});
            this._toastService.showSuccessToastr(
              'Appliance deleted successfully',
              ''
            );
            this.getAppliances();
            console.log('delete appliance res', res);
          });
      }
    });
    // this._sharkManagementService.deleteAppliance(element.id).subscribe((res:any)=>{
    //   console.log("delete Appliance res", res)
    // })
  }
}
