import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/shared/shared-service/user-service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
export interface UserList {
  id: string;
  request_type: string;
  message: string;
  status: string;
  user_id: string;
  organization_id: string;
}
export interface PendingUserList {
  id: string;
  request_type: string;
  message: string;
  status: string;
  user_id: string;
  organization_id: string;
  action: string;
}
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'request_type',
    'message',
    'status',
    'user_id',
    'organization_id',
  ];
  // dataSource = new MatTableDataSource<UserList>(ELEMENT_DATA)
  dataSource: MatTableDataSource<UserList>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns1: string[] = [
    'id',
    'request_type',
    'message',
    'status',
    'user_id',
    'organization_id',
    'action',
  ];
  // dataSource = new MatTableDataSource<UserList>(ELEMENT_DATA)
  dataSource1: MatTableDataSource<PendingUserList>;
  // @ViewChild(MatPaginator, { static: true }) paginator1: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort1: MatSort;

  constructor(
    private _userService: UserService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(); // create new object
    this.getUsersList(); // forgeted this line
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource1 = new MatTableDataSource(); // create new object
    this.getPendingUsersList(); // forgeted this line
    // this.dataSource1.paginator = this.paginator1;
    // this.dataSource1.sort = this.sort1;
  }
  getUsersList() {
    this._userService.getApprovedUserList().subscribe((data: any) => {
      console.log(data);
      console.log('Laps', data);
      this.dataSource.data = data; // on data receive populate dataSource.data array
      return data;
    });
  }

  getPendingUsersList() {
    this._userService.getPendingUserList().subscribe((data1: any) => {
      console.log(data1);
      console.log('Laps-----', data1);
      this.dataSource1.data = data1; // on data1 receive populate dataSource.data array
      return data1;
    });
  }
  cliclFunction(element) {
    console.log('inside function', element);
    const userStatus = {
      status: 'Approved',
    };
    this._userService
      .approveUserRequest(element.id, userStatus)
      .subscribe((res: any) => {
        this.getUsersList(); // forgeted this line
        this.getPendingUsersList();
        this._toastService.showToastr('User approved successfully', '');
      });
  }
}
