import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  loginUser(loginDetails): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}login_user`, loginDetails);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}signup_user`, user);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}create_user`, user);
  }
}
