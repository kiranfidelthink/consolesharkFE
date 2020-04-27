import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  baseUrl: string = environment.baseUrl;
  user_id: string;
  user_email: string;
  organization_id: string;
  constructor(private http: HttpClient) {}

  loginUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}login_user`, user);
  }
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}signup_user`, user);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}create_user`, user);
  }
 
}
