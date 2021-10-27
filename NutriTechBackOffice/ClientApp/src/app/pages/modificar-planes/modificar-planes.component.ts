import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  //Flags
  hide = true;

  //Route
  nombreParam: string;

  //Spinner
  loading$ = this.loader.loading$;

  planModificacionForm = this.fb.group({
    nombre: [null, Validators.required],
    tipo: [null, Validators.required],
    cantidadAgua: [null],
    cantidadColaciones: [null, Validators.required],
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
        this.fillFormWithPlanData(this.planModificar);
      },
      err => {
      }
    )
  }

  private fillFormWithPlanData(planData: PlanAlimentacion) {
    this.planModificacionForm.controls.nombre.setValue(planData.nombre);
    this.planModificacionForm.controls.tipo.setValue(planData.tipo);
    this.planModificacionForm.controls.cantidadAgua.setValue(planData.cantAguaDiaria);
    this.planModificacionForm.controls.cantidadColaciones.setValue(planData.cantColacionesDiarias);
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

  onSubmit() {
    let plan = this.buildPlanForm();
    this.updatePlanInfo(plan.Nombre, plan);
  }

  private buildPlanForm(): PlanAlimentacionForm {
    return {
      'Nombre': this.planModificacionForm.value['nombre'],
      'Tipo': this.planModificacionForm.value['tipo'],
      'CantAguaDiaria': this.planModificacionForm.value['cantidadAgua'],
      'CantColacionesDiarias': this.planModificacionForm.value['cantidadColaciones'],
      'Desayuno': this.planModificacionForm.value['desayuno'],
      'Almuerzo': this.planModificacionForm.value['almuerzo'],
      'Merienda': this.planModificacionForm.value['merienda'],
      'Cena': this.planModificacionForm.value['cena'],
      'Colacion': this.planModificacionForm.value['colacion'],
    };
  }

  private updatePlanInfo(nombre: string, planForm: PlanAlimentacionForm) {
    this.disableFormWhileLoading();

    debugger;
    this.planService.updatePlan(nombre, planForm).subscribe(
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

}
