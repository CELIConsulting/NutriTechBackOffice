import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserForm } from '../interfaces/user-form';
import { environment as env } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  addUser(user: UserForm) {
    return this.http.post(`${env.apiBaseUrl}/User/`,user);
  }
      
  getUserById(email: String): Observable<User> {
    return this.http.get<User>(`${env.apiBaseUrl}/User/${email}`)
  }
}
