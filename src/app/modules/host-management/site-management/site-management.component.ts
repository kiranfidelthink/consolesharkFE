import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { HostManagementService } from 'src/app/shared/shared-service/host-management-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewSiteComponent } from 'src/app/modals/add-new-site/add-new-site.component';
import { EmitService } from 'src/app/shared/shared-service/emit-service';

export interface PeriodicElement {
  name: string;
  addressLineOne: string;
  addressLineTwo: string;
  country: any;
  city: string;
  state: string;
  zipCode: string
}

@Component({
  selector: 'site-management',
  templateUrl: './site-management.component.html',
  styleUrls: ['./site-management.component.css'],
})
export class SiteManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'addressLineOne',
    'addressLineTwo',
    'country',
    'city',
    'state',
    'zipCode'
  ];
  dataSource: MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private _hostManagementService: HostManagementService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private _emitService: EmitService,
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
    this.spinner.show();
    this.dataSource = new MatTableDataSource();
    this.getSites();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  openPopup(){
    this.modalService.open(AddNewSiteComponent, {
      scrollable: true,
      size:'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'myCustomModalClass',
    });
  }
}
