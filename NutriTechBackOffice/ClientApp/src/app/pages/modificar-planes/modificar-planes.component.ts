import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpComponent } from 'src/app/components/pop-up/pop-up.component';
import { PlanAlimentacion } from 'src/app/interfaces/plan-alimentacion';
import { PlanAlimentacionForm } from 'src/app/interfaces/plan-alimentacion-form';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';
import { PlanesService } from 'src/app/services/planes.service';

@Component({
  selector: 'app-modificar-planes',
  templateUrl: './modificar-planes.component.html',
  styleUrls: ['./modificar-planes.component.css']
})
export class ModificarPlanesComponent implements OnInit {

  planModificar: PlanAlimentacion;
  Desayuno: Array<string> = [];
  Almuerzo: Array<string> = [];
  Merienda: Array<string> = [];
  Cena: Array<string> = [];
  Colacion: Array<string> = [];

  minLitrosAgua: number = 0;
  minCantColaciones: number = 0;
  numberRegEx = "/\-?\d*\.?\d{1,2}/";

  //Flags
  hide = true;

  //Route
  nombreParam: string;

  //Spinner
  loading$ = this.loader.loading$;

  planModificacionForm = this.fb.group({
    nombre: [null, Validators.required],
    tipo: [null, Validators.required],
    litrosAgua: [null],
    cantColaciones: [null, Validators.required],
    desayuno: [null, Validators.required],
    almuerzo: [null, Validators.required],
    merienda: [null, Validators.required],
    cena: [null, Validators.required],
    colacion: [null, Validators.required],
  });

  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private planService: PlanesService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loader: LoadingSpinnerService) {
  }


  ngOnInit() {
    this.cargarPantalla();
    
  }

  private getRouteParams() {
    this.activatedRoute.paramMap.subscribe(parameters => {
      this.nombreParam = parameters.get('nombre');
    })
  }

  cargarPantalla() {
    this.getRouteParams();
    this.planService.getPlanById(this.nombreParam).subscribe(
      data => {
        this.planModificar = data;
        this.Desayuno = this.Desayuno.concat(data.desayuno)
        this.Almuerzo = this.Almuerzo.concat(data.almuerzo)
        this.Merienda = this.Merienda.concat(data.merienda)
        this.Cena = this.Cena.concat(data.cena)
        this.Colacion = this.Colacion.concat(data.colacion)
        this.PlanData(this.planModificar)
      },
      err => {
      }
    )
  }

  private PlanData(planData: PlanAlimentacion) {
    this.planModificacionForm.controls.nombre.setValue(planData.nombre);
    this.planModificacionForm.controls.tipo.setValue(planData.tipo);
    this.planModificacionForm.controls.litrosAgua.setValue(planData.cantAguaDiaria);
    this.planModificacionForm.controls.cantColaciones.setValue(planData.cantColacionesDiarias);
    this.planModificacionForm.controls.desayuno.setValue(planData.desayuno);
    this.planModificacionForm.controls.almuerzo.setValue(planData.almuerzo);
    this.planModificacionForm.controls.merienda.setValue(planData.merienda);
    this.planModificacionForm.controls.cena.setValue(planData.cena);
    this.planModificacionForm.controls.colacion.setValue(planData.colacion);
  }


  navigateToplanList() {
    let currentUrl = 'listado-planes';
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  updatePlan() {
    let plan = this.buildplanModificacionForm();
    this.updatePlanInfo(plan.Nombre, plan);
  }

  private buildplanModificacionForm(): PlanAlimentacionForm {
    return {
      // 'Nombre': this.planModificacionForm.value['nombre'],
      // 'Tipo': this.planModificacionForm.value['tipo'],
      // 'CantAguaDiaria': this.planModificacionForm.value['litrosAgua'],
      // 'CantColacionesDiarias': this.planModificacionForm.value['colaciones'],
      'Nombre': this.planModificacionForm.value['nombre'],
      'Tipo': this.planModificacionForm.value['tipo'],
      'CantAguaDiaria': this.planModificacionForm.value['litrosAgua'],
      'CantColacionesDiarias': this.planModificacionForm.value['cantColaciones'],
      'Desayuno': this.Desayuno,
      'Almuerzo':this.Almuerzo,
      'Merienda': this.Merienda,
      'Cena': this.Cena,
      'Colacion': this.Colacion,
    };
  }

  private updatePlanInfo(nombre: string, planModificacionForm: PlanAlimentacionForm) {
    this.disableFormWhileLoading();

    debugger;
    this.planService.updatePlan(nombre, planModificacionForm).subscribe(
      data => {
        this.dialog.open(PopUpComponent, { data: { title: "Listo!", message: "El plan fue correctamente modificado." } });

        this.dialog.afterAllClosed.subscribe(() => {
          this.navigateToplanList()
        })
      },
      err => {
        this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "No se pudo modificar el plan." } });

        this.dialog.afterAllClosed.subscribe(() => {
          this.enableFormWhileFinished();
        })
      }

    )
  }

  private disableFormWhileLoading() {
    this.planModificacionForm.disable({ onlySelf: true });
  }

  private enableFormWhileFinished() {
    this.planModificacionForm.enable({ onlySelf: true });
  }

  
  //Desayuno
  addOpcionDesayuno() {
    let nuevaOpcion: string = this.planModificacionForm.controls["desayuno"].value;

    if (nuevaOpcion) {
      this.Desayuno.push(nuevaOpcion);
    }

    this.planModificacionForm.controls["desayuno"].reset();

  }

  removeOpcionDesayuno(posOpcion: number) {
    this.Desayuno.splice(posOpcion, 1);
  }

  //Almuerzo
  addOpcionAlmuerzo() {
    let nuevaOpcion: string = this.planModificacionForm.controls["almuerzo"].value;

    if (nuevaOpcion) {
      this.Almuerzo.push(nuevaOpcion);
    }

    this.planModificacionForm.controls["almuerzo"].reset();

  }

  removeOpcionAlmuerzo(posOpcion: number) {
    this.Almuerzo.splice(posOpcion, 1);
  }


  //Merienda
  addOpcionMerienda() {
    let nuevaOpcion: string = this.planModificacionForm.controls["merienda"].value;

    if (nuevaOpcion) {
      this.Merienda.push(nuevaOpcion);
    }

    this.planModificacionForm.controls["merienda"].reset();

  }

  removeOpcionMerienda(posOpcion: number) {
    this.Merienda.splice(posOpcion, 1);
  }

  //Cena
  addOpcionCena() {
    let nuevaOpcion: string = this.planModificacionForm.controls["cena"].value;

    if (nuevaOpcion) {
      this.Cena.push(nuevaOpcion);
    }

    this.planModificacionForm.controls["cena"].reset();

  }

  removeOpcionCena(posOpcion: number) {
    this.Cena.splice(posOpcion, 1);
  }


  //Colacion
  addOpcionColacion() {
    let nuevaOpcion: string = this.planModificacionForm.controls["colacion"].value;

    if (nuevaOpcion) {
      this.Colacion.push(nuevaOpcion);
    }

    this.planModificacionForm.controls["colacion"].reset();

  }

  removeOpcionColacion(posOpcion: number) {
    this.Colacion.splice(posOpcion, 1);
  }

}
