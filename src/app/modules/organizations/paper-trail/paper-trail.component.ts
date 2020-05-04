import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/shared/shared-service/user-service';
export interface PeriodicElement {
  id: string;
  time: string;
  severity: string;
  event_type: string;
  email: string;
  message: string;
  ip_address: string;
  triggered_by: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     id: '1',
//     time: '158806',
//     message: '127.0.0.22',
//     severity: 'being warning',
//     status: 'Active',
//     createdAt: '2020-04-28T11:19:27.803Z',
//     updatedAt: '2020-04-28T11:19:27.803Z',
//     user_id: '1',
//   },
//   {
//     id: '2',
//     time: '1588069850',
//     message: '127.0.0',
//     severity: 'being warning',
//     status: 'Active',
//     createdAt: '2020-04-28T11:19:27.803Z',
//     updatedAt: '2020-04-28T11:19:27.803Z',
//     user_id: '1',
//   },
//   // { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   // { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' }
// ];
@Component({
  selector: 'app-paper-trail',
  templateUrl: './paper-trail.component.html',
  styleUrls: ['./paper-trail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PaperTrailComponent implements OnInit {
  title = 'angular-material-data-table';

  displayedColumns: string[] = ['id', 'time', 'severity', 'event_type', 'message', 'ip_address', 'triggered_by'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)
  dataSource: MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  tableData: any;
  todayData: Date;
  constructor(private _userService: UserService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(); // create new object
    this.getPaperTrail(); // forgeted this line
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getClass(priority){
    // console.log("priority", priority)
  
    return {'informational': priority =='Informational',
                  'warning': priority == 'Warning', 
                  'critical': priority =='Critical',
                  'notification': priority =='Notification'}
 
 }
  getPaperTrail() {
    this._userService.getPaperTrailLog().subscribe((data: any) => {
      console.log(data);
      this.todayData = new Date()
      console.log('Laps');
      this.dataSource.data = data; // on data receive populate dataSource.data array
      return data;
    });
  }
}
