import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { Paciente } from '../../interfaces/paciente';
import { PacienteForm } from '../../interfaces/paciente-form';
import { PlanAlimentacion } from '../../interfaces/plan-alimentacion';
import { PlanAsignado } from '../../interfaces/plan-asignado';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { PlanesService } from '../../services/planes.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-asignacion-plan',
  templateUrl: './asignacion-plan.component.html',
  styleUrls: ['./asignacion-plan.component.css']
})
export class AsignacionPlanComponent implements OnInit {

  maxLengthNotas = 240;
  modoEdicion = false;

  asignacionPlanForm: FormGroup;
  pacientesRegistrados: Array<Paciente> = [];
  planesDisponibles: Array<PlanAlimentacion> = [];
  pacienteSeleccionado: Paciente;
  pacienteFormActualizado: PacienteForm;
  planSeleccionado: string;
  notasAdicionales: string;

  loading$ = this.loader.loading$;

  constructor(
    private fb: FormBuilder,
    private planesService: PlanesService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private router: Router,
    private loader: LoadingSpinnerService) {

    this.obtenerPacientes();
    this.obtenerPlanes();
  }

  ngOnInit() {
    this.asignacionPlanForm = this.fb.group({
      pacientes: [{ value: '', disabled: this.modoEdicion }, Validators.required],
      planesAlimentacion: [],
      notasAdicionales: [null, Validators.maxLength(this.maxLengthNotas)],
    });

    //Fix: Firing mat-error message with notasAdicionales when typing
    this.asignacionPlanForm.controls['notasAdicionales'].markAsTouched();
  }

  obtenerPlanes() {
    this.planesService.getAllPlans()
      .subscribe(
        (planes) => {
          this.planesDisponibles = planes;
        },
        (error) => { console.error("No se pudo obtener los planes disponibles") })

  }
  obtenerPacientes() {
    this.usersService.getPatients()
      .subscribe(
        (pacientes) => {
          this.pacientesRegistrados = pacientes;
        },
        (error) => { console.error("No se pudo obtener a los pacientes registrados") });
  }

  asignarPlan() {
    this.pacienteFormActualizado = this.buildUpdatedPaciente();
    this.updatePacienteData(this.pacienteFormActualizado);
  }

  private buildUpdatedPaciente(): PacienteForm {
    return {
      Apellido: this.pacienteSeleccionado.apellido,
      Nombre: this.pacienteSeleccionado.nombre,
      Email: this.pacienteSeleccionado.email,
      Password: this.pacienteSeleccionado.password,
      Rol: this.pacienteSeleccionado.rol,
      Telefono: this.pacienteSeleccionado.telefono,
      FechaNacimiento: this.pacienteSeleccionado.fechaNacimiento,
      Altura: this.pacienteSeleccionado.altura,
      Peso: this.pacienteSeleccionado.peso,
      MedidaCintura: this.pacienteSeleccionado.medidaCintura,
      TipoAlimentacion: this.pacienteSeleccionado.tipoAlimentacion,
      PlanAsignado: this.getNewPlanAsignado()
    }
  }


  private getNewPlanAsignado(): PlanAsignado {
    return {
      planAlimentacion: this.asignacionPlanForm.controls["planesAlimentacion"].value,
      notasAdicionales: this.asignacionPlanForm.controls["notasAdicionales"].value,
      lastAsignacion: new Date(),
    };
  }


  toggleFormAsignacion() {
    this.modoEdicion = !this.modoEdicion;
    this.loadPlanActual();
  }

  private loadPlanActual() {
    let planActual: PlanAsignado = this.pacienteSeleccionado.planAsignado;

    if (planActual) {
      this.planSeleccionado = planActual.planAlimentacion;
      this.notasAdicionales = planActual.notasAdicionales;
    }
    else {
      this.planSeleccionado = null;
      this.notasAdicionales = null;
    }
  }

  updatePacienteData(pacienteForm: PacienteForm) {
    console.log(pacienteForm);
    this.disableFormWhileLoading();

    this.usersService.updatePaciente(this.pacienteSeleccionado.email, pacienteForm).subscribe
      (
        (pacienteOK) => {
          this.dialog.open(PopUpComponent, { data: { title: "Listo!", message: "El plan fue asignado al paciente correctamente." } });

          this.dialog.afterAllClosed.subscribe(() => {
            this.refreshPantalla()
          })
        }
        ,
        (error) => {
          this.dialog.open(PopUpComponent, { data: { title: "Oops!", message: "No se pudo asignar un plan al paciente." } });
        }
      );
  }


  private refreshPantalla() {
    console.log("Refreshing component...")
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  private disableFormWhileLoading() {
    this.asignacionPlanForm.disable({ onlySelf: true });
  }

  private enableFormWhileFinished() {
    this.asignacionPlanForm.enable({ onlySelf: true });
  }

}


