import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { PlanAlimentacionForm } from 'src/app/interfaces/plan-alimentacion-form';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { PlanesService } from '../../services/planes.service';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css']
})
export class PlanFormComponent implements OnInit {
  planForm: FormGroup;

  //Reglas de negocio
  minLitrosAgua: number = 0;
  minCantColaciones: number = 0;

  constructor(private fb: FormBuilder, private planesService: PlanesService, public dialog: MatDialog) {
    //Inyectar servicios en el constructor (providers)
  }

  ngOnInit() {
    this.planForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required,],
      litrosAgua: ['', [Validators.required, Validators.min(this.minLitrosAgua)]],
      cantColaciones: ['', [Validators.required, Validators.min(this.minCantColaciones)]],
      //opcionesDesayuno: [],
      //opcionesAlmuerzo: [],
      //opcionesMerienda: [],
      //opcionesCena: [],
      //opcionesColacion: []
    });
  }

  onSubmit() {
    //TODO: Testear con opciones de platos hardcodeadas

    if (this.planForm.valid) {
      let plan: PlanAlimentacionForm = {
        "Nombre": this.planForm.controls["nombre"].value,
        "Tipo": this.planForm.controls["tipo"].value,
        "CantAguaDiaria": this.planForm.controls["litrosAgua"].value,
        "CantColacionesDiarias": this.planForm.controls["cantColaciones"].value,
        "Desayuno": ["Desayuno, opción 1"],
        "Almuerzo": ["Almuerzo, opción 1"],
        "Merienda": ["Merienda, opción 1"],
        "Cena": ["Cena, opción 1"],
        "Colacion": [],
      }

      //Chequeando objeto
      console.table(plan);

      //Invocar service
      console.log("Sending request...");
      this.planesService.addPlan(plan).subscribe(
        planResponse => {
          console.log("Request OK!");
          this.dialog.open(PopUpComponent, { data: { title: "Listo!", message: "El plan fue agregado correctamente" } });

        }, error => {
          console.error("Request Failed");
          this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: `${error} exception message` } });
          //this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "No se pudo agregar el plan" } });
        });

    }
    else {
      //TODO: Modificar el mensaje del popup
      this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "El formulario no es válido" } });
    }




  }
}
