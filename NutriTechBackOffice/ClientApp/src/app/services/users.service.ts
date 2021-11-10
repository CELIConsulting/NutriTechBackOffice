import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, using } from 'rxjs';
import { UserForm } from '../interfaces/user-form';
import { environment as env } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Paciente } from '../interfaces/paciente';
import { PacienteForm } from '../interfaces/paciente-form';
import { AngularFireAuth } from '@angular/fire/auth';
import { GraficValues } from '../interfaces/grafic-values';
import { DailyUploadResponse } from '../interfaces/daily-upload-response';
import { DailyUpload } from '../interfaces/daily-upload';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
  };

  constructor(private http: HttpClient, public auth: AngularFireAuth) { }

  getToken() {
    return JSON.parse(JSON.stringify(this.auth.auth.currentUser)).stsTokenManager.accessToken;
  }

  //POST: Dar de alta a un usuario
  addUser(user: UserForm) {
    return this.http.post(`${env.apiBaseUrl}/User/`, user, this.httpOptions);
  }

  //GET: Obtener usuario por mail
  getUserById(email: String): Observable<User> {
    return this.http.get<User>(`${env.apiBaseUrl}/User/${email}`, this.httpOptions);
  }



  //GET: Obtener todos los usuarios
  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${env.apiBaseUrl}/User/`, this.httpOptions);
  }

  //DELETE: Borrar un usuario
  deleteUser(email: string): Observable<boolean> {
    return this.http.delete<boolean>(`${env.apiBaseUrl}/User/${email}`, this.httpOptions);
  }

  //PUT: Actualizar la información de un usuario
  updateUser(email: string, user: UserForm): Observable<User> {
    return this.http.put<User>(`${env.apiBaseUrl}/User/${email}`, user, this.httpOptions);
  }

  //GET: Obtener los usuarios que tengan rol de paciente
  getPatients(): Observable<Array<Paciente>> {
    return this.http.get<Array<Paciente>>(`${env.apiBaseUrl}/User/Patients/`, this.httpOptions);
  }

  //GET: Obtener paciente por mail
  getPatientById(email: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${env.apiBaseUrl}/User/Patients/${email}`, this.httpOptions);
  }

  //GET: Obtener progreso paciente con mail
  getBodyProgress(email: string): Observable<GraficValues[]> {
    return this.http.get<GraficValues[]>(`${env.apiBaseUrl}/User/Patients/BodyProgress/${email}`, this.httpOptions);
  }

  //PUT: Actualizar la información del paciente
  updatePaciente(email: string, paciente: PacienteForm): Observable<Paciente> {
    return this.http.put<Paciente>(`${env.apiBaseUrl}/User/Patients/${email}`, paciente, this.httpOptions);
  }

  //PUT: Actualizar la información del usuario quitando los campos del paciente
  updateUserWithoutPatientData(email: string, paciente: PacienteForm): Observable<User> {
    return this.http.put<User>(`${env.apiBaseUrl}/User/Patients/Convert/${email}`, paciente, this.httpOptions);
  }

  //GET: trae toda la colecion de carga diaria de un usuario
  getPattientDailyUpload(email: string): Observable<DailyUpload[]> {
    return this.http.get<DailyUpload[]>(`${env.apiBaseUrl}/User/Patients/DailyUpload/${email}`, this.httpOptions);
  }

}
