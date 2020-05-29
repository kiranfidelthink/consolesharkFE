import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { ConfirmDialogCOmponent } from 'src/app/modals/confirm-dialog/confirm-dialog.component';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { LogService } from 'src/app/shared/shared-service/log.service';
import { HttpClient } from '@angular/common/http';
import { SharkManagementService } from 'src/app/shared/shared-service/shark-management-services';
import { AddNewDongleComponent } from 'src/app/modals/dongle/add-dongle/add-dongle.component';
import { EditDongleComponent } from 'src/app/modals/dongle/edit-dongle/edit-dongle.component';

export interface PeriodicElement {
  dongle_serial: string
  date_added: string;
  mfg_date: string;
  managed_host: string;
  site: string;
  appliance: string;
  license: string;
  parameters: string;
  status: string;
  action: string;
}

@Component({
  selector: 'dongle',
  templateUrl: './dongle.component.html',
  styleUrls: ['./dongle.component.css'],
})
export class DongleComponent implements OnInit {
  displayedColumns: string[] = [
    'dongle_serial',
    'date_added',
    'mfg_date',
    'managed_host',
    'site',
    'appliance',
    'license',
    'parameters',
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
      this.updateDongleDetails(m);
    });
  }
  updateDongleDetails(event) {
    this.getDongle();
    console.log('Fire onFilterClick: ', event);
  }

  ngOnInit() {
    this.getIPAddress();
    // this.spinner.show();
    this.dataSource = new MatTableDataSource();
    this.getDongle();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getIPAddress() {
    this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
      console.log(
        'ip address inside create new dongle',
        this.log.ip_address
      );
    });
  }
  getDongle() {
    this._sharkManagementService.getDongle().subscribe((data: any) => {
      this.spinner.hide();
      console.log(data);
      console.log('Laps');
      this.dataSource.data = data;
      return data;
    });
  }
  openPopup() {
    this.modalService.open(AddNewDongleComponent, {
      scrollable: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'myCustomModalClass',
    });
  }
  onEditDongle(element) {
    console.log('On edit dongle', element);
    const modalRef = this.modalService.open(EditDongleComponent, {
      scrollable: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'myCustomModalClass',
    });
    let data = {
      dongleInfo: element,
    };

    modalRef.componentInstance.fromDongleComponent = data;
  }
  public user = {
    name: 'Izzat Nadiri',
    age: 26,
  };
  // onDeleteDongle(element) {
  //   console.log("Insid edelete applicane", element)
  //   element.module = "Dongle";
  //   const modalRef = this.modalService.open(ConfirmDialogCOmponent);
  //   modalRef.componentInstance.element = element;
  //   modalRef.result.then((result) => {
  //     if (result) {
  //       console.log('result--', result);
  //       this._sharkManagementService
  //         .deleteDongle(element.id)
  //         .subscribe((res: any) => {
  //           this.log.event_type = 'Dongle deleted';
  //           this.log.message = 'Dongle deleted Successfully';
  //           this._logService.createLog(this.log).subscribe((res: any) => {});
  //           this._toastService.showSuccessToastr(
  //             'Dongle deleted successfully',
  //             ''
  //           );
  //           this.getDongle();
  //           console.log('delete dongle res', res);
  //         });
  //     }
  //   });
  //   // this._sharkManagementService.deleteDongle(element.id).subscribe((res:any)=>{
  //   //   console.log("delete Dongle res", res)
  //   // })
  // }
}
