import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { PlanAlimentacionForm } from 'src/app/interfaces/plan-alimentacion-form';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { PlanAlimentacion } from '../../interfaces/plan-alimentacion';
import { PlanesService } from '../../services/planes.service';


@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css']
})
export class PlanFormComponent implements OnInit {
  planForm: FormGroup;
  @ViewChild(FormGroupDirective, null) formGroupDirective: FormGroupDirective;

  planesExistentes: Array<PlanAlimentacion> = [];
  opcionesDesayuno: Array<string> = [];
  opcionesAlmuerzo: Array<string> = [];
  opcionesMerienda: Array<string> = [];
  opcionesCena: Array<string> = [];
  opcionesColacion: Array<string> = [];

  //Reglas de negocio
  minLitrosAgua: number = 0;
  minCantColaciones: number = 0;
  numberRegEx = "/\-?\d*\.?\d{1,2}/";

  constructor(private fb: FormBuilder, private planesService: PlanesService, public dialog: MatDialog) {
    console.log("Sending request to get all plans");
    this.getAllPlans();
  }

  ngOnInit() {
    this.planForm = this.fb.group({
      nombre: ['', { validators: [Validators.required], onUpdate: "change" }],
      tipo: ['', { validators: [Validators.required], onUpdate: "change" }],
      litrosAgua: ['', {
        validators: [
          Validators.required,
          Validators.min(this.minLitrosAgua)
        ],
        onUpdate: "change"
      }],
      cantColaciones: new FormControl("",
        {
          validators: [
            Validators.required,
            Validators.min(this.minCantColaciones)],
          //Validators.pattern(this.numberRegEx)],
          updateOn: 'change'
        }),
      nuevaOpcionDesayuno: [],
      nuevaOpcionAlmuerzo: [],
      nuevaOpcionCena: [],
      nuevaOpcionMerienda: [],
      nuevaOpcionColacion: [],
    });

  }

  createPlan() {
    if (this.planForm.valid) {
      let plan: PlanAlimentacionForm = {
        "Nombre": this.planForm.controls["nombre"].value,
        "Tipo": this.planForm.controls["tipo"].value,
        "CantAguaDiaria": this.planForm.controls["litrosAgua"].value,
        "CantColacionesDiarias": this.planForm.controls["cantColaciones"].value,
        "Desayuno": this.opcionesDesayuno,
        "Almuerzo": this.opcionesAlmuerzo,
        "Merienda": this.opcionesMerienda,
        "Cena": this.opcionesCena,
        "Colacion": this.opcionesColacion,
      }

      console.log("Sending request to create a new plan");
      this.planesService.addPlan(plan).subscribe(
        planResponse => {
          console.log("Request OK!");
          this.dialog.open(PopUpComponent, { data: { title: "Listo!", message: "El plan fue agregado correctamente" } });

          setTimeout(() => this.resetForm(), 0);

        }, error => {
          console.error("Request Failed");
          this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "No se pudo agregar el plan" } });
        });

    }
    else {
      this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "El formulario no es válido. Revisar campos." } });
    }

  }

  getAllPlans() {
    this.planesService.getAllPlans().subscribe(
      (planes) => {
        this.planesExistentes = planes;
        console.log("Response to get plans: OK");
        console.table(this.planesExistentes);
      },
      (error) => { console.error("Response to get all plans: FAILS", error) }
    )
  }

  //Desayuno
  addOpcionDesayuno() {
    let nuevaOpcion: string = this.planForm.controls["nuevaOpcionDesayuno"].value;

    if (nuevaOpcion) {
      this.opcionesDesayuno.push(nuevaOpcion);
    }

    this.planForm.controls["nuevaOpcionDesayuno"].reset();

  }

  removeOpcionDesayuno(posOpcion: number) {
    this.opcionesDesayuno.splice(posOpcion, 1);
  }

  //Almuerzo
  addOpcionAlmuerzo() {
    let nuevaOpcion: string = this.planForm.controls["nuevaOpcionAlmuerzo"].value;

    if (nuevaOpcion) {
      this.opcionesAlmuerzo.push(nuevaOpcion);
    }

    this.planForm.controls["nuevaOpcionAlmuerzo"].reset();

  }

  removeOpcionAlmuerzo(posOpcion: number) {
    this.opcionesAlmuerzo.splice(posOpcion, 1);
  }


  //Merienda
  addOpcionMerienda() {
    let nuevaOpcion: string = this.planForm.controls["nuevaOpcionMerienda"].value;

    if (nuevaOpcion) {
      this.opcionesMerienda.push(nuevaOpcion);
    }

    this.planForm.controls["nuevaOpcionMerienda"].reset();

  }

  removeOpcionMerienda(posOpcion: number) {
    this.opcionesMerienda.splice(posOpcion, 1);
  }

  //Cena
  addOpcionCena() {
    let nuevaOpcion: string = this.planForm.controls["nuevaOpcionCena"].value;

    if (nuevaOpcion) {
      this.opcionesCena.push(nuevaOpcion);
    }

    this.planForm.controls["nuevaOpcionCena"].reset();

  }

  removeOpcionCena(posOpcion: number) {
    this.opcionesCena.splice(posOpcion, 1);
  }


  //Colacion
  addOpcionColacion() {
    let nuevaOpcion: string = this.planForm.controls["nuevaOpcionColacion"].value;

    if (nuevaOpcion) {
      this.opcionesColacion.push(nuevaOpcion);
    }

    this.planForm.controls["nuevaOpcionColacion"].reset();

  }

  removeOpcionColacion(posOpcion: number) {
    this.opcionesColacion.splice(posOpcion, 1);
  }

  private resetForm() {
    this.formGroupDirective.resetForm();
    this.opcionesDesayuno = [];
    this.opcionesMerienda = [];
    this.opcionesMerienda = [];
    this.opcionesCena = []
    this.opcionesColacion = [];
  }



}
