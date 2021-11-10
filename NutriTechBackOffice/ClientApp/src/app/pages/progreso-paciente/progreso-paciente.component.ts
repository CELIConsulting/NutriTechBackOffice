import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../interfaces/user';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';


@Component({
  selector: 'app-progreso-paciente',
  templateUrl: './progreso-paciente.component.html',
  styleUrls: ['./progreso-paciente.component.css']
})
export class ProgresoPacienteComponent implements OnInit {
  emailParam: string;
  displayedColumnsPaciente: string[] = ['peso', 'medidas'];
  dataSource: MatTableDataSource<User>;
  dataSourcePaciente: MatTableDataSource<User>;
  paciente: User[];
  loading$ = this.loader.loading$;

  constructor(private usersService: UsersService, private loader: LoadingSpinnerService, private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.getRouteParams();
    this.obtenerInformacion(this.emailParam);
  }

  private getRouteParams() {
    this.activatedRoute.paramMap.subscribe(parameters => {
      this.emailParam = parameters.get('email');
    })
  }


  obtenerInformacion(email) {
    this.dataSourcePaciente = new MatTableDataSource();
    this.usersService.getPatients()
      .subscribe(
        patients => {
          var pacienteFiltrado = new Array();
          pacienteFiltrado.push(patients.find(m => m.email == email));
          this.paciente = pacienteFiltrado
          var objetivo = document.getElementById('nombreId');
          objetivo.innerHTML = this.paciente[0].nombre;
          this.dataSourcePaciente = new MatTableDataSource(this.paciente);
        },
        error => {
          console.error("No se pudo obtener el paciente")
          console.log(error)
        });
  }

}
