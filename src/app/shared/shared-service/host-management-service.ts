import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SiteManagement } from '../../models/site-management';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ManagedHosts } from 'src/app/models/managed-hosts';
@Injectable()
export class HostManagementService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getSites(): Observable<SiteManagement> {
    return this.http.get<SiteManagement>(`${this.baseUrl}get_Sites`);
  }
  createSite(site: SiteManagement): Observable<SiteManagement> {
    console.log('site insisde create site', site);
    return this.http.post<SiteManagement>(`${this.baseUrl}create_Site`, site);
  }
  updateSite(site: SiteManagement, site_id): Observable<SiteManagement> {
    console.log('user inside host management service update site', site);
    // this.site_id = localStorage.getItem('site_id');
    return this.http.patch<SiteManagement>(
      `${this.baseUrl}update_Site?Site_id=${site_id}`,
      site
    );

    // console.log('site insisde create site', site);
    // return this.http.post<SiteManagement>(`${this.baseUrl}create_Site`, site);
  }
  deleteSite(site_id): Observable<SiteManagement> {
    console.log("site id", site_id)
    return this.http.delete<SiteManagement>(
      `${this.baseUrl}delete_Site?Site_id=${site_id}`
    );

    // console.log('site insisde create site', site);
    // return this.http.post<SiteManagement>(`${this.baseUrl}create_Site`, site);
  }

  getManagedHosts(): Observable<SiteManagement> {
    return this.http.get<SiteManagement>(`${this.baseUrl}get_Hosts`);
  }
  createHost(host: ManagedHosts): Observable<ManagedHosts> {
    console.log('host insisde create host', host);
    return this.http.post<ManagedHosts>(`${this.baseUrl}create_Host`, host);
  }
  updateHost(host: ManagedHosts, host_id): Observable<ManagedHosts> {
    console.log('user inside host management service update site', host);
    // this.host_id = localStorage.getItem('host_id');
    return this.http.patch<ManagedHosts>(
      `${this.baseUrl}update_Host?Host_id=${host_id}`,
      host
    );

    // console.log('site insisde create site', site);
    // return this.http.post<SiteManagement>(`${this.baseUrl}create_Site`, site);
  }
}
