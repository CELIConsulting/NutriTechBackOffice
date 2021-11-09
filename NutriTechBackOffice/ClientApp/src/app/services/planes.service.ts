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

  //GET: Obtener plan por nombre
  getPlanById(nombre: String): Observable<PlanAlimentacion> {
    return this.http.get<PlanAlimentacion>(`${env.apiBaseUrl}/Plan/${nombre}`, this.httpOptions)
  }

  //DELETE: Borrar un plan
  deletePlan(nombre: string): Observable<boolean> {
    return this.http.delete<boolean>(`${env.apiBaseUrl}/Plan/${nombre}`, this.httpOptions);
  }

  //PUT: Actualizar la información de un plan
  updatePlan(nombre: string, plan: PlanAlimentacionForm): Observable<PlanAlimentacion> {
    return this.http.put<PlanAlimentacion>(`${env.apiBaseUrl}/Plan/${nombre}`, plan, this.httpOptions);
  }

}
