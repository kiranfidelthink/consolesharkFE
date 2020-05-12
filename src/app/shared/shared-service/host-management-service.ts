import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SiteManagement } from '../../models/site-management';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export class HostManagementService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {
  }

  getSites(): Observable<SiteManagement> {
    return this.http.get<SiteManagement>(
        `${this.baseUrl}get_Sites`
      );
  }
}
