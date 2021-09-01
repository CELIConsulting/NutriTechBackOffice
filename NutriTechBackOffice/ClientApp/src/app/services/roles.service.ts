import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${env.apiBaseUrl}/role`);
  }

  getRole(roleId: string): Observable<Role> {
    return this.http.get<Role>(`${env.apiBaseUrl}/role/${roleId}`);
  }
}
