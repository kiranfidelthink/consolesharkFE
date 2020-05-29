import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { HostManagementService } from 'src/app/shared/shared-service/host-management-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditSiteComponent } from 'src/app/modals/edit-site/edit-site.component';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { AddNewSiteComponent } from 'src/app/modals/add-new-site/add-new-site.component';
import { ConfirmDialogCOmponent } from 'src/app/modals/confirm-dialog/confirm-dialog.component';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { HttpClient } from '@angular/common/http';

export interface PeriodicElement {
  name: string;
  site_address: string;
  site_contact: any;
  hours_of_operation: string;
  lat_lng: string;
  createdAt: string;
  lastModified: string
  action: string;
}

@Component({
  selector: 'site-management',
  templateUrl: './site-management.component.html',
  styleUrls: ['./site-management.component.css'],
})
export class SiteManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'site_address',
    'site_contact',
    'hours_of_operation',
    'lat_lng',
    'createdAt',
    'lastModified',
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
      this.updateSitesDetails(m);
    });
  }
  updateSitesDetails(event) {
    this.getSites();
    console.log('Fire onFilterClick: ', event);
  }

  ngOnInit() {
    this.getIPAddress();
    // this.spinner.show();
    this.dataSource = new MatTableDataSource();
    this.getSites();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getIPAddress() {
    this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
      console.log(
        'ip address inside create new site',
        this.log.ip_address
      );
    });
  }
  getSites() {
    this._hostManagementService.getSites().subscribe((data: any) => {
      this.spinner.hide();
      console.log(data);
      console.log('Laps');
      this.dataSource.data = data;
      return data;
    });
  }
  openPopup() {
    this.modalService.open(AddNewSiteComponent, {
      scrollable: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'myCustomModalClass',
    });
  }
  onEditSite(element) {
    console.log('On edit site', element);
    const modalRef = this.modalService.open(EditSiteComponent, {
      scrollable: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'myCustomModalClass',
    });
    let data = {
      siteInfo: element,
    };

    modalRef.componentInstance.fromSiteComponent = data;
  }
  public user = {
    name: 'Izzat Nadiri',
    age: 26,
  };
  onDeleteSite(element) {
    element.module = "Site";
    const modalRef = this.modalService.open(ConfirmDialogCOmponent);
    modalRef.componentInstance.element = element;
    modalRef.result.then((result) => {
      if (result) {
        console.log('result--', result);
        this._hostManagementService
          .deleteSite(element.id)
          .subscribe((res: any) => {
            this.log.event_type = 'Site deleted';
          this.log.message = 'Site deleted Successfully';
          this._logService.createLog(this.log).subscribe((res: any) => {});
            this._toastService.showSuccessToastr(
              'Site deleted successfully',
              ''
            );
            this.getSites();
            console.log('delete site res', res);
          });
      }
    });
    // this._hostManagementService.deleteSite(element.id).subscribe((res:any)=>{
    //   console.log("delete site res", res)
    // })
  }
}
