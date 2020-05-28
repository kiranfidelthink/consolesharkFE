import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SiteManagement } from '../../models/site-management';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ManagedHosts } from 'src/app/models/managed-hosts';
import { DeviceAndUserData } from '../../models/deviceandUserData';
@Injectable()
export class HostManagementService {
  baseUrl: string = environment.baseUrl;
  organization_id: string;
  constructor(private http: HttpClient) {
    this.organization_id = localStorage.getItem('organization_id');
  }

  getSites(): Observable<SiteManagement> {
    return this.http.get<SiteManagement>(
      `${this.baseUrl}get_Sites?organization_id=${this.organization_id}`
    );
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
    console.log('site id', site_id);
    return this.http.delete<SiteManagement>(
      `${this.baseUrl}delete_Site?Site_id=${site_id}`
    );

    // console.log('site insisde create site', site);
    // return this.http.post<SiteManagement>(`${this.baseUrl}create_Site`, site);
  }

  getManagedHosts(): Observable<SiteManagement> {
    return this.http.get<SiteManagement>(
      `${this.baseUrl}get_Hosts?organization_id=${this.organization_id}`
    );
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
  requestToAccessDevice(
    requestDetails: DeviceAndUserData,
    element
  ): Observable<DeviceAndUserData> {
    console.log('site request to access device', requestDetails);
    return this.http.post<DeviceAndUserData>(
      `${this.baseUrl}launch_Console?Host_id=${element.id}`,
      requestDetails
    );
    // https://api.dashboard.consoleshark.com/user-svc/launch_Console?Host_id=2
  }

  disconnectHost(requestDetails: any, element): Observable<any> {
    return this.http.get<any>(
      `http://${requestDetails.IP}:5000/todo/api/v1.0/portrestart`
    );
  }
}
