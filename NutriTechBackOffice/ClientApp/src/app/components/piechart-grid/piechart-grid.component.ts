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
    var pacienteOmnivoro=new Array();
    var pacienteVegetariano=new Array();
    var pacienteVegano=new Array();
    var pacienteSindefinir=new Array();
    this.usersService.getPatients()
      .subscribe(
        patient => {
          patient.forEach(element => {
            
            if(element.tipoAlimentacion=="Omnivoro")
            {             
              pacienteOmnivoro.push(element);
            }
            else if(element.tipoAlimentacion=="Vegetariano")
            {
              pacienteVegetariano.push(element);
            }
            else if(element.tipoAlimentacion=="Vegano")
            {
              pacienteVegano.push(element);
            }
            else if(element.tipoAlimentacion==null)
            {
              pacienteSindefinir.push(element);
            }
          }); 
          this.single = [
            {
              "name": "Omnivoros",
              "value": pacienteOmnivoro.length
            },
            {
              "name": "Vegetarianos",
              "value": pacienteVegetariano.length
            },
            {
              "name": "Veganos",
              "value": pacienteVegano.length
            },
            {
              "name": "Sin Definir",
              "value": pacienteSindefinir.length
            }
          ];
        },
        error => {
          console.error("No se pudo obtener los datos")
          console.log(error)
        });

  }
}

