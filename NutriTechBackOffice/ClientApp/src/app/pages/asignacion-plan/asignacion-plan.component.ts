import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { Paciente } from '../../interfaces/paciente';
import { PacienteForm } from '../../interfaces/paciente-form';
import { PlanAlimentacion } from '../../interfaces/plan-alimentacion';
import { PlanAsignado } from '../../interfaces/plan-asignado';
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

  constructor(
    private fb: FormBuilder,
    private planesService: PlanesService,
    private usersService: UsersService,
    private dialog: MatDialog) {

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
        },
        (error) => { console.error("No se pudo obtener los planes disponibles") })
  }

  obtenerPacientes() {
    console.log("Sending request to get pacientes");
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
      lastAsignacion: []
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
    this.usersService.updatePaciente(this.pacienteSeleccionado.email, pacienteForm).subscribe
      (
        (pacienteOK) => { this.dialog.open(PopUpComponent, { data: { title: "Listo!", message: "El plan fue asignado al paciente correctamente." } }); }
        ,
        (error) => { this.dialog.open(PopUpComponent, { data: { title: "Oops!", message: "No se pudo asignar un plan al paciente." } }); }
      );
  }
}


