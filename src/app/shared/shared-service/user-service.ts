import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { Organization } from '../../models/organization';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Password } from '../../models/password';
import { PaperTrail } from 'src/app/models/paper-trail';
import { map } from 'rxjs/operators';
import { ExistingOrganization } from 'src/app/models/join-existing-org';

@Injectable()
export class UserService {
  baseUrl: string = environment.baseUrl;
  user_id: string;
  user_email: string;
  organization_id: string;
  constructor(private http: HttpClient) {
    this.user_id = localStorage.getItem('user_id');
    this.organization_id = localStorage.getItem('organization_id');
    // this.getIPAddress();
  }

  getUserAndOrganization(user: User): Observable<User> {
    const userEmail = {
      email: user,
    };
    // const params = {
    //   ip_address: this.ipAddress,
    //   triggered_by:"triggered_by",
    //   email_id:"email_id",
    //   user_id:this.user_id,
    //   time:"current time"
    //   };
    // return this.http.post<User>(`${this.baseUrl}get_userOrg`, userEmail, {
    //   params: params,
    // });
    return this.http.post<User>(`${this.baseUrl}get_userOrg`, userEmail);
  }
  getUserOrganizationById(user: User): Observable<User> {
    // return this.http.get<User>(`${this.baseUrl}get_Organization?organization_id=${user}`);
    return this.http.get<User>(
      `${this.baseUrl}get_Organization?organization_id=${user}`
    );
  }
  verifyMobile(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}verify_phone`, user);
  }
  verifyEmailAddress(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}verify_email`, user);
  }
  sendMobileOTP(user: User): Observable<User> {
    const mobileNumber = {
      mobile_number: user.mobile_number,
    };
    return this.http.post<User>(`${this.baseUrl}send_otp`, mobileNumber);
  }
  createOrganization(
    organization: Organization,
    log_details
  ): Observable<Organization> {
    const params = {
      log: JSON.stringify(log_details),
    };
    return this.http.post<Organization>(
      `${this.baseUrl}create_Organization`,
      organization,
      { params: params }
    );
  }
  updateUserByOrganization(user: User): Observable<User> {
    this.user_id = localStorage.getItem('user_id');
    const orgId = {
      organization_id: user,
    };
    return this.http.patch<User>(
      `${this.baseUrl}update_user?user_id=${this.user_id}`,
      orgId
    );
  }
  updatePassword(password: Password): Observable<Password> {
    this.user_email = localStorage.getItem('userEmail');
    const update_password = {
      password: password.currentPassword,
      username: this.user_email,
      newpassword: password.newPassword,
    };
    return this.http.post<Password>(
      `${this.baseUrl}change_password`,
      update_password
    );
  }
  updateUserPassword(password: Password): Observable<Password> {
    console.log('Insdie updateUserPassword', password);
    this.user_id = localStorage.getItem('user_id');
    console.log('Insdie updateUserPassword', this.user_id);
    const update_password = {
      password: password,
    };
    return this.http.patch<Password>(
      `${this.baseUrl}update_user?user_id=${this.user_id}`,
      update_password
    );
  }

  updateUserprofile(user: User): Observable<User> {
    console.log('user inside auth service', user);
    this.user_id = localStorage.getItem('user_id');
    return this.http.patch<User>(
      `${this.baseUrl}update_user?user_id=${this.user_id}`,
      user
    );
  }
  updateOrganization(user: User): Observable<User> {
    console.log('user inside updateOrganization', user);
    this.organization_id = localStorage.getItem('organization_id');
    // this.userEmail = localStorage.getItem('userEmail')

    return this.http.patch<User>(
      `${this.baseUrl}update_Organization?organization_id=${this.organization_id}`,
      user
    );
  }

  getPaperTrailLog() {
    // return this.http.get<User>(`${this.baseUrl}get_Organization?organization_id=${user}`);
    return this.http.get<PaperTrail>(`${this.baseUrl}get_Logs`);
  }
  getOrganizationList() {
    // return this.http.get<User>(`${this.baseUrl}get_Organization?organization_id=${user}`);
    return this.http.get<PaperTrail>(
      `${this.baseUrl}get_Organizations?filter=`
    );
  }
  getOrganizationListFilter(event) {
    console.log('----------', event);
    // return this.http.get<User>(`${this.baseUrl}get_Organization?organization_id=${user}`);
    return this.http.get<PaperTrail>(
      `${this.baseUrl}get_Organizations?filter=${event}`
    );
  }
  createJoinOrgReq(
    existingOrganization: ExistingOrganization
  ): Observable<ExistingOrganization> {
    console.log("existingOrganization inside service", existingOrganization)
    return this.http.post<ExistingOrganization>(
      `${this.baseUrl}create_Request`,
      existingOrganization
    );
  }
}
