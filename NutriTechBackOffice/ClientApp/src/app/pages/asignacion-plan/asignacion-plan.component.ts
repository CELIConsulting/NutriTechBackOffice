import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timeStamp } from 'console';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { PlanAlimentacion } from '../../interfaces/plan-alimentacion';
import { PlanAsignado } from '../../interfaces/plan-asignado';
import { User } from '../../interfaces/user';
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
  pacientesRegistrados: Array<User> = [];
  planesDisponibles: Array<PlanAlimentacion> = [];
  pacienteSeleccionado: User;
  planSeleccionado: string;
  notasAdicionales: string;

  constructor(
    private fb: FormBuilder,
    private planesService: PlanesService,
    private usersService: UsersService) {

    this.obtenerPacientes();
    this.obtenerPlanes();
  }

  ngOnInit() {
    this.asignacionPlanForm = this.fb.group({
      pacientes: [null, Validators.required],
      planesAlimentacion: [],
      notasAdicionales: [null, Validators.maxLength(this.maxLengthNotas)],
    });

  }

  obtenerPlanes() {
    console.log("Sending request to get planes");
    this.planesService.getAllPlans()
      .subscribe(
        (planes) => {
          this.planesDisponibles = planes;
          console.log("Se pudo obtener los planes");
        },
        (error) => { console.error("No se pudo obtener los planes disponibles") })
  }

  obtenerPacientes() {
    console.log("Sending request to get pacientes");
    this.usersService.getPatients()
      .subscribe(
        (pacientes) => {
          this.pacientesRegistrados = pacientes;
          console.log("Se pudo obtener los pacientes");
        },
        (error) => { console.error("No se pudo obtener a los pacientes registrados") });
  }


  //TODO: Crear form de paciente
  //TODO: Crear un paciente con los datos del form

  asignarPlan() {
    //Crear planAsignado en base al form
    let planAsignadoForm: PlanAsignado = ({
      planAlimentacion: this.asignacionPlanForm.controls["planesAlimentacion"].value,
      notasAdicionales: this.asignacionPlanForm.controls["notasAdicionales"].value,
      lastAsignacion: []
    });

    this.pacienteSeleccionado.planAsignado = planAsignadoForm;

    //Actualizar data del paciente
    this.usersService.updatePaciente(this.pacienteSeleccionado.email, null);
  }

  toggleFormAsignacion() {
    setTimeout((() => {
      this.modoEdicion = !this.modoEdicion;
      this.loadPlanActual();
    }), 100);
  }

  private loadPlanActual() {
    let planActual: PlanAsignado = this.pacienteSeleccionado.planAsignado;

    //Contras - Un get por cada vez que se seleccione al paciente

    if (planActual) {
      this.planSeleccionado = planActual.planAlimentacion.nombre;
      this.notasAdicionales = planActual.notasAdicionales;
    }
    else {
      this.planSeleccionado = null;
      this.notasAdicionales = null;
    }
  }

  private updatePacienteData(paciente: User) {

  }
}


