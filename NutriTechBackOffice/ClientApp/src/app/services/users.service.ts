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

  //POST: Dar de alta a un usuario
  addUser(user: UserForm) {
    return this.http.post(`${env.apiBaseUrl}/User/`,user);
  }

  //GET: Obtener usuario por mail
  getUserById(email: String): Observable<User> {
    return this.http.get<User>(`${env.apiBaseUrl}/User/${email}`)
  }

  //GET: Obtener los usuarios que tengan rol de paciente
  getPatients(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${env.apiBaseUrl}/User/Patients/`)
  }

  //PUT: Actualizar la información del paciente
  updatePaciente(email:string, paciente: UserForm) {
    return this.http.put(`${env.apiBaseUrl}/User/${email}`, paciente);
  }

}
