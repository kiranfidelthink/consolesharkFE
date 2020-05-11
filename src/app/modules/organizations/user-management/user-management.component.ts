import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/shared/shared-service/user-service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
export interface UserList {
  first_name: string;
  last_name: string;
  email: string;
  status:string;
  action: string
 
}
export interface PendingUserList {
  first_name: string;
  last_name: string;
  email: string;
  status:string;
  action: string
}
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'status',
    'action'
    
  ];
  // dataTableUsers = new MatTableDataSource<UserList>(ELEMENT_DATA)
  dataTableUsers: MatTableDataSource<UserList>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns1: string[] = [
    'first_name',
    'last_name',
    'email',
    'status',
    'action'
  ];
  // dataTableUsers = new MatTableDataSource<UserList>(ELEMENT_DATA)
  dataTablePendingUsers: MatTableDataSource<PendingUserList>;
  organization_id: string;
  // @ViewChild(MatPaginator, { static: true }) paginator1: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort1: MatSort;

  constructor(
    private _userService: UserService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    this.organization_id = localStorage.getItem('organization_id')
    this.dataTableUsers = new MatTableDataSource(); // create new object
    this.getApprovedUsersList(this.organization_id); // forgeted this line
    this.dataTableUsers.paginator = this.paginator;
    this.dataTableUsers.sort = this.sort;

    this.dataTablePendingUsers = new MatTableDataSource(); // create new object
    this.getSubmittedUsersList(this.organization_id); // forgeted this line
    // this.dataTablePendingUsers.paginator = this.paginator1;
    // this.dataTablePendingUsers.sort = this.sort1;
  }
  getApprovedUsersList(organization_id) {
    this._userService.getApprovedUserList(organization_id).subscribe((data: any) => {
      console.log(data);
      console.log('Laps', data);
      this.dataTableUsers.data = data; // on data receive populate dataTableUsers.data array
      return data;
    });
  }

  getSubmittedUsersList(organization_id) {
    this._userService.getSubmittedUserList(organization_id).subscribe((data1: any) => {
      console.log(data1);
      console.log('Laps-----', data1);
      this.dataTablePendingUsers.data = data1; // on data1 receive populate dataTableUsers.data array
      return data1;
    });
  }
  onEditUser(element){
    console.log('element inside on onEditUser', element);
  }
  onDeleteUser(element){
    console.log('element inside on onRejectRequest', element);
    const userStatus = {
      status: 'Rejected',
    };
    this._userService
      .approveUserRequest(element.id, userStatus)
      .subscribe((res: any) => {
        this.getApprovedUsersList(this.organization_id); // forgeted this line
        this.getSubmittedUsersList(this.organization_id);
        this._toastService.showToastr('User request rejected', '');
      });
  }
  onApproveRequest(element){
    console.log('inside function onApproveRequest', element);
    const userStatus = {
      status: 'Approved',
    };
    this._userService
      .approveUserRequest(element.id, userStatus)
      .subscribe((res: any) => {
        console.log("res of onApproveRequest", res)
        this.updateUser(element);
        this.getApprovedUsersList(this.organization_id); // forgeted this line
        this.getSubmittedUsersList(this.organization_id);
        this._toastService.showToastr('User approved successfully', '');
      });
  }

  updateUser(element){
    const user: any = {
      organization_id : this.organization_id
    };
    this._userService.updateUser(user, element.user.id).subscribe(
      (res) => {
      
      });
  }
  onRejectRequest(element){
    console.log('element inside on onRejectRequest', element);
    const userStatus = {
      status: 'Rejected',
    };
    this._userService
      .approveUserRequest(element.id, userStatus)
      .subscribe((res: any) => {
        this.getApprovedUsersList(this.organization_id); // forgeted this line
        this.getSubmittedUsersList(this.organization_id);
        this._toastService.showToastr('User request rejected', '');
      });
  }
}
