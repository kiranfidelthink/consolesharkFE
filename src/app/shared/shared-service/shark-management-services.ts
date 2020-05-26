import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appliance } from '../../models/appliance';
import { Dongle } from '../../models/dongle';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ManagedHosts } from 'src/app/models/managed-hosts';
@Injectable()
export class SharkManagementService {
  baseUrl: string = environment.baseUrl;
  organization_id: string;
  constructor(private http: HttpClient) {
    this.organization_id= localStorage.getItem('organization_id')
  }


  /*********************************************Appliance****************************************************** */
  getAppliances(): Observable<Appliance> {
    return this.http.get<Appliance>(`${this.baseUrl}get_Appliances?organization_id=${this.organization_id}`);
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

  /***********************************************Dongle********************************************************* */
  getDongle(): Observable<Appliance> {
    return this.http.get<Appliance>(`${this.baseUrl}get_Dongles?organization_id=${this.organization_id}`);
  }
  createDongle(appliance: Dongle): Observable<Dongle> {
    console.log('appliance insisde create appliance', appliance);
    return this.http.post<Dongle>(`${this.baseUrl}create_Dongle`, appliance);
  }
  updateDongle(appliance: Dongle, appliance_id): Observable<Dongle> {
    console.log('user inside host management service update appliance', appliance);
    // this.appliance_id = localStorage.getItem('appliance_id');
    return this.http.patch<Dongle>(
      `${this.baseUrl}update_Dongle?Dongle_id=${appliance_id}`,
      appliance
    );

    // console.log('appliance insisde create appliance', appliance);
    // return this.http.post<Dongle>(`${this.baseUrl}create_Dongle`, appliance);
  }
  deleteDongle(appliance_id): Observable<Dongle> {
    console.log("appliance id", appliance_id)
    return this.http.delete<Dongle>(
      `${this.baseUrl}delete_Dongle?Dongle_id=${appliance_id}`
    );

    // console.log('appliance insisde create appliance', appliance);
    // return this.http.post<Dongle>(`${this.baseUrl}create_Appliance`, appliance);
  }
}
