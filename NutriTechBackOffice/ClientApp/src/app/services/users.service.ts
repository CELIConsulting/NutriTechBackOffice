import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserForm } from '../interfaces/user-form';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  addUser(user: UserForm) {
    return this.http.post(`${env.apiBaseUrl}/User/`,user);
  }
}
