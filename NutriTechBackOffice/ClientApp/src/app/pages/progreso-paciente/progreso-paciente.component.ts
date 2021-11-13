import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../interfaces/user';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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

  multi: any[];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Fecha';
  yAxisLabel: string = 'Peso';
  timeline: boolean = true;

  constructor(private usersService: UsersService, private loader: LoadingSpinnerService, private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    this.getRouteParams();
    debugger
    this.cargarDatosGraficos(this.emailParam);
    this.obtenerInformacion(this.emailParam);
  }

  private getRouteParams() {
    this.activatedRoute.paramMap.subscribe(parameters => {
      this.emailParam = parameters.get('email');
    })
  }

  cargarDatosGraficos(email) {
    this.usersService.getBodyProgress(email).subscribe(
      listDataGrafic => {
        debugger
        Object.assign(this, { listDataGrafic });
      },
      error => {
        debugger
        console.error("No se puede levantar la informacion")
        console.log(error)
      }
     )
  }

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
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
