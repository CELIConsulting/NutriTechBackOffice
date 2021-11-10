import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-piechart-grid',
  templateUrl: './piechart-grid.component.html',
  styleUrls: ['./piechart-grid.component.css']
})
export class PiechartGridComponent implements OnInit {

  single: any[];
  view: any[] = [500, 400];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private usersService: UsersService) {
    //Object.assign(this, { single });
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
              "name": "Omnivoros",
              "value": patient.filter(elemento=>elemento.tipoAlimentacion=="Omnivoro").length
            },
            {
              "name": "Vegetarianos",
              "value": patient.filter(elemento=>elemento.tipoAlimentacion=="Vegetariano").length
            },
            {
              "name": "Veganos",
              "value": patient.filter(elemento=>elemento.tipoAlimentacion=="Vegano").length
            },
            {
              "name": "Sin Definir",
              "value": patient.filter(elemento=>elemento.tipoAlimentacion==null).length
            }
          ];
        },
        error => {
          console.error("No se pudo obtener los datos")
          console.log(error)
        });

  }
}

