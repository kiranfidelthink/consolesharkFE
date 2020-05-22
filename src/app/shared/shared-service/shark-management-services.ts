import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appliance } from '../../models/appliance';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ManagedHosts } from 'src/app/models/managed-hosts';
@Injectable()
export class SharkManagementService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAppliances(): Observable<Appliance> {
    return this.http.get<Appliance>(`${this.baseUrl}get_Appliances`);
  }
  createAppliance(appliance: Appliance): Observable<Appliance> {
    console.log('appliance insisde create appliance', appliance);
    return this.http.post<Appliance>(`${this.baseUrl}create_Appliance`, appliance);
  }
  updateAppliance(appliance: Appliance, appliance_id): Observable<Appliance> {
    console.log('user inside host management service update appliance', appliance);
    // this.appliance_id = localStorage.getItem('appliance_id');
    return this.http.patch<Appliance>(
      `${this.baseUrl}update_Appliance?Appliance_id=${appliance_id}`,
      appliance
    );

    // console.log('appliance insisde create appliance', appliance);
    // return this.http.post<Appliance>(`${this.baseUrl}create_Appliance`, appliance);
  }
  deleteAppliance(appliance_id): Observable<Appliance> {
    console.log("appliance id", appliance_id)
    return this.http.delete<Appliance>(
      `${this.baseUrl}delete_Appliance?Appliance_id=${appliance_id}`
    );

    // console.log('appliance insisde create appliance', appliance);
    // return this.http.post<Appliance>(`${this.baseUrl}create_Appliance`, appliance);
  }

  getManagedHosts(): Observable<Appliance> {
    return this.http.get<Appliance>(`${this.baseUrl}get_Hosts`);
  }
  createHost(host: ManagedHosts): Observable<ManagedHosts> {
    console.log('host insisde create host', host);
    return this.http.post<ManagedHosts>(`${this.baseUrl}create_Host`, host);
  }
  updateHost(host: ManagedHosts, host_id): Observable<ManagedHosts> {
    console.log('user inside host management service update appliance', host);
    // this.host_id = localStorage.getItem('host_id');
    return this.http.patch<ManagedHosts>(
      `${this.baseUrl}update_Host?Host_id=${host_id}`,
      host
    );

    // console.log('appliance insisde create appliance', appliance);
    // return this.http.post<Appliance>(`${this.baseUrl}create_Appliance`, appliance);
  }
}
