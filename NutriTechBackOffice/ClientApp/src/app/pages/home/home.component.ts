import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../interfaces/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Paciente } from 'src/app/interfaces/paciente';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'acciones'];
  displayedColumnsPaciente: string[] = ['altura', 'peso', 'medidas'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  dataSourcePaciente: MatTableDataSource<User> = new MatTableDataSource();
  pacientes: User[] = [];
  paciente: User[] = [];
  mostrar = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  loading$ = this.loader.loading$;
  labelPosition: 'todos' | 'conplan' | 'sinplan' = 'todos';

  constructor(private usersService: UsersService, private loader: LoadingSpinnerService, private router:Router) { }
  ngOnInit() {
    this.cargarGrilla();
  }

  cargarGrilla() {
    var pacienteFiltrado=new Array();
    this.usersService.getPatients()
      .subscribe(
        patient => {
          if(this.labelPosition == 'todos')
          {
            this.pacientes = patient;
            this.dataSource = new MatTableDataSource(this.pacientes);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          else if (this.labelPosition == 'conplan')
          {
            patient.forEach(element => {

              if(element.planAsignado!=null)
              {
                pacienteFiltrado.push(element);
                this.pacientes = pacienteFiltrado;
              }
            });
              this.dataSource = new MatTableDataSource(pacienteFiltrado);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
          }
          else if (this.labelPosition=='sinplan')
          {
            patient.forEach(element => {

              if(element.planAsignado==null)
              {
                pacienteFiltrado.push(element);
                this.pacientes = pacienteFiltrado;
              }
            });
              this.dataSource = new MatTableDataSource(pacienteFiltrado);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
          }
        },
        error => {
          console.error("No se pudo obtener a los pacientes con planes")
          console.log(error)
        });

  }

  modificarPaciente(email) {
    this.usersService.getPatients()
      .subscribe(
        patients => {
          var pacienteFiltrado = new Array();
          pacienteFiltrado.push(patients.find(m => m.email == email));
          this.paciente = pacienteFiltrado
          var objetivo = document.getElementById('nombreId');
          objetivo.innerHTML = this.paciente[0].nombre;
          this.dataSourcePaciente = new MatTableDataSource(this.paciente);
          this.router.navigate(['/modificar-usuarios/', this.paciente[0].email, this.paciente[0].rol]);

        },
        error => {
          console.error("No se pudo obtener el paciente")
          console.log(error)
        });

  }

  obtenerInformacion(email)
  {
    this.mostrar = false;
    this.usersService.getPatients()
    .subscribe(
      patients => {
        var pacienteFiltrado=new Array();
        pacienteFiltrado.push(patients.find(m=>m.email==email));
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

  verProgreso() {
   this.router.navigate(['/progreso-paciente/', this.paciente[0].email]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerPaciente(email) {
  }
}


