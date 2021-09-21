import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { LogInForm } from '../interfaces/log-in-form';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient) { }

  authenticate(user: LogInForm) {
    return this.http.post(`${env.apiBaseUrl}/LogIn/`, user, { observe: 'response' })
  }
}
