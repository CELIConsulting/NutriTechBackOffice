import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Role } from '../interfaces/role';
import { environment as env } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
  };

  constructor(private http: HttpClient, public auth: AngularFireAuth) { }


  getToken() {
    //return from(this.auth.auth.currentUser.getIdToken().then(token => {
    //  return token
    //}))

    return JSON.parse(JSON.stringify(this.auth.auth.currentUser)).stsTokenManager.accessToken
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${env.apiBaseUrl}/role`, this.httpOptions);
  }

  getRole(roleId: string): Observable<Role> {
    return this.http.get<Role>(`${env.apiBaseUrl}/role/${roleId}`, this.httpOptions);
  }
}
