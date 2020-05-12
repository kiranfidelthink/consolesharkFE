import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { HostManagementService } from 'src/app/shared/shared-service/host-management-service';

export interface PeriodicElement {
  name: string;
  addressLineOne: string;
  addressLineTwo: string;
  country: any;
  city: any;
  state: any;
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
    private spinner: NgxSpinnerService
  ) {}

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
}
