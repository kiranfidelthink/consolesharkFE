import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LogService } from '../shared-service/log.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  log: any = {
    time: new Date().getTime(),
    email: localStorage.getItem('userEmail'),
    user_id: localStorage.getItem('user_id'),
    triggered_by: 'Login Page',
    severity: 'Informational',
  };
  constructor(
    private routes: Router,
    private http: HttpClient,
    private _logService: LogService
    ) { }

  ngOnInit(){
    this.getIPAddress();

  }
  getIPAddress() {
    this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
      this.log.ip_address = res.ip;
    });
  }
  logout(){
    this.log.event_type = 'Logout success';
    this.log.message = 'User logout Successfully';

    this._logService.createLog(this.log).subscribe((res: any) => {
    });

    localStorage.removeItem('organizationDetails');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user_id');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('organization_id');
    this.routes.navigate(['/login']);
  }
}
