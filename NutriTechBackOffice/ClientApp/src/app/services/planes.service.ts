import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { PlanAlimentacion } from '../interfaces/plan-alimentacion';
import { PlanAlimentacionForm } from '../interfaces/plan-alimentacion-form';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor(private http: HttpClient) { }

  //POST: NEW PLAN
  addPlan(plan: PlanAlimentacionForm): Observable<{}> {
    return this.http.post(`${env.apiBaseUrl}/Plan/`, plan);
  }

  //GET: ALL PLANS
  getAllPlans(): Observable<Array<PlanAlimentacion>> {
    return this.http.get<Array<PlanAlimentacion>>(`${env.apiBaseUrl}/Plan/`);
  }

}
