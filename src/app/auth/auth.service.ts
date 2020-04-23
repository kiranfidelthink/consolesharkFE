import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Organization } from '../models/organization';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  baseUrl: string = environment.baseUrl;
  user_id:string;
  constructor(private http: HttpClient) {}
  // checkusernameandpassword(uname: string, pwd: string) {
  //   console.log("user", uname)
  //   console.log("pwd", pwd)
  //   if (uname == 'admin' && pwd == 'admin123') {
  //     localStorage.setItem('username', 'admin');
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  loginUser(user: User) : Observable<User> {
    return this.http.post<User>(`${this.baseUrl}login_user`, user);
  }
  registerUser(user: User) : Observable<User> {
    return this.http.post<User>(`${this.baseUrl}signup_user`, user);
  }
  createUser(user:User):Observable<User>{
    // console.log("===========", user)
    return this.http.post<User>(`${this.baseUrl}create_user`, user);
  }
  getUSerOrganization(user:User):Observable<User>{
    // console.log("===========", user)
    const userEmail = {
      email:user
    }
    return this.http.post<User>(`${this.baseUrl}get_user`, userEmail);
  }
  verifyMobile(user: User) : Observable<User> {
    // console.log("userrrrrr", user)
    return this.http.post<User>(`${this.baseUrl}verify_phone`, user);
  }
  verifyEmailAddress(user: User) : Observable<User> {
    // console.log("userrrrrr----", user)
    return this.http.post<User>(`${this.baseUrl}verify_email`, user);
  }
  sendMobileOTP(user: User) : Observable<User> {
    // console.log("userrrrrr----,,,,,,,,,,,,,,,,,,,,,", user)
    const mobileNumber = {
      mobile_number: user.mobile_number
  }
    return this.http.post<User>(`${this.baseUrl}send_otp`, mobileNumber);
  }
  createOrganization(organization: Organization) : Observable<Organization> {
    return this.http.post<Organization>(`${this.baseUrl}create_Organization`, organization);
  }
  updateUserByOrganization(user: User) : Observable<User> {
    this.user_id = localStorage.getItem('user_id')
    const orgId = {
      organization_id: user
    }
    return this.http.patch<User>(`${this.baseUrl}update_user?user_id=${this.user_id}`, orgId);
  }
  // registerUser(user : User){
  //   return this.http.post('https://api.dashboard.consoleshark.com/user-svc/signup_user',user) 
  //   }
}
