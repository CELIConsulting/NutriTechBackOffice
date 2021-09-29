import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { PlanAlimentacion } from '../interfaces/plan-alimentacion';
import { PlanAlimentacionForm } from '../interfaces/plan-alimentacion-form';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
  };
  constructor(private http: HttpClient, public auth: AngularFireAuth) { }
  getToken() {
    return JSON.parse(JSON.stringify(this.auth.auth.currentUser)).stsTokenManager.accessToken
  }
  //POST: NEW PLAN
  addPlan(plan: PlanAlimentacionForm): Observable<{}> {
    return this.http.post(`${env.apiBaseUrl}/Plan/`, plan, this.httpOptions);
  }

  //GET: ALL PLANS
  getAllPlans(): Observable<Array<PlanAlimentacion>> {
    return this.http.get<Array<PlanAlimentacion>>(`${env.apiBaseUrl}/Plan/`, this.httpOptions);
  }

}
