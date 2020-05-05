import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Log } from 'src/app/models/log';
import { Observable } from 'rxjs';

@Injectable()
export class LogService {
  baseUrl: string = environment.baseUrl;
  user_id: string;
  user_email: string;
  organization_id: string;
  constructor(private http: HttpClient) {
    this.user_id = localStorage.getItem('user_id');
    this.organization_id = localStorage.getItem('organization_id');
    // this.getIPAddress();
  }

  getLogs(){

  }
  createLog(log: Log): Observable<Log> {
    return this.http.post<Log>(`${this.baseUrl}create_Log`, log);
  }
  
}
