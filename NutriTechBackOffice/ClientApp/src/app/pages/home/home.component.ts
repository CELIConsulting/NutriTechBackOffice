import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../interfaces/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { isNullOrUndefined } from 'util';
import { EMPTY } from 'rxjs';
import { Paciente } from 'src/app/interfaces/paciente';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'acciones'];
  dataSource: MatTableDataSource<User>;
  pacientes: User[];
  paciente: User;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.cargarGrilla();
  }

  cargarGrilla() {
    var i=0;
    this.usersService.getPatients()
      .subscribe(
        patient => {        
          if(patient[i].planAsignado == null){
            this.pacientes = patient;
            this.dataSource = new MatTableDataSource(this.pacientes);
  
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            i++;
          }         
        },
        error => {
          console.error("No se pudo obtener a los pacientes con planes")
          console.log(error)
        });

  }

  obtenerInformacion(paciente)
  {
      
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


