import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  baseUrl: string = environment.baseUrl;
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
    console.log("===========", user)
    return this.http.post<User>(`${this.baseUrl}create_user`, user);
  }
  // registerUser(user : User){
  //   return this.http.post('https://api.dashboard.consoleshark.com/user-svc/signup_user',user) 
  //   }
}
