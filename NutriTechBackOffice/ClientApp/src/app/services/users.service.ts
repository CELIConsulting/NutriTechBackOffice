import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserForm } from '../interfaces/user-form';
import { environment as env } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Paciente } from '../interfaces/paciente';
import { PacienteForm } from '../interfaces/paciente-form';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  //POST: Dar de alta a un usuario
  addUser(user: UserForm) {
    return this.http.post(`${env.apiBaseUrl}/User/`,user);
  }

  //GET: Obtener usuario por mail
  getUserById(email: String): Observable<User> {
    return this.http.get<User>(`${env.apiBaseUrl}/User/${email}`)
  }

  //GET: Obtener los usuarios que tengan rol de paciente
  getPatients(): Observable<Array<Paciente>> {
    return this.http.get<Array<Paciente>>(`${env.apiBaseUrl}/User/Patients/`)
  }

  //PUT: Actualizar la información del paciente
  updatePaciente(email:string, paciente: PacienteForm): Observable<Paciente> {
    return this.http.put<Paciente>(`${env.apiBaseUrl}/User/Patients/${email}`, paciente);
  }

}
