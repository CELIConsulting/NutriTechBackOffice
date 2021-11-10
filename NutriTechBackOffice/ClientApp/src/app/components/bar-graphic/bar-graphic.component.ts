import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-bar-graphic',
  templateUrl: './bar-graphic.component.html',
  styleUrls: ['./bar-graphic.component.css']
})
export class BarGraphicComponent implements OnInit {

  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad de pacientes';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private usersService: UsersService) {
    //Object.assign(this, { single })
  }

  ngOnInit() {
    this.cargarGrafico();
  }

  onSelect(event) {
    console.log(event);
  }

  cargarGrafico() {
    this.usersService.getPatients()
      .subscribe(
        patient => {
          this.single = [
            {
              "name": "Con plan",
              "value": patient.filter(elemento=>elemento.planAsignado!=null).length
            },
            {
              "name": "Sin plan",
              "value": patient.filter(elemento=>elemento.planAsignado==null).length
            }
          ];
        },
        error => {
          console.error("No se pudo obtener los datos")
          console.log(error)
        });

  }

}