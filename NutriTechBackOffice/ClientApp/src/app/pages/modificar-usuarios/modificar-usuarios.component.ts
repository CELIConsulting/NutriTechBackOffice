import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserForm } from '../../interfaces/user-form';
import { RolesService } from '../../services/roles.service';
import { UsersService } from '../../services/users.service';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { MatDatepicker, MatDialog } from '@angular/material';
import { Paciente } from '../../interfaces/paciente';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { PacienteForm } from '../../interfaces/paciente-form';
import * as _moment from 'moment';
import { Moment } from 'moment';

const PACIENTE = "Paciente";
const ADMIN = "Admin";
const NUTRICIONISTA = "Nutricionista";

@Component({
  selector: 'app-modificar-usuarios',
  templateUrl: './modificar-usuarios.component.html',
  styleUrls: ['./modificar-usuarios.component.css']
})

export class ModificarUsuariosComponent implements OnInit {
  //Update
  usuarioModificar: User;
  pacienteModificar: Paciente;
  rolSeleccionado: string;

  //Flags
  hide = true;

  //Route
  emailParam: string;
  rolParam: string;

  //Spinner
  loading$ = this.loader.loading$;

  //MomentJS
  moment = _moment;

  userModificacionForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [{ value: '', disabled: true }],
    password: [null, Validators.required],
    rol: [null, Validators.required],
    fechaNac: [null, Validators.required],
    phoneNumber: [null],
  });

  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private roleService: RolesService,
    private usersService: UsersService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loader: LoadingSpinnerService) {

    this.fillRoles();
  }


  fillRoles() {
    this.roleService.getRoles().subscribe(
      data => {
        this.roles = data.map(item => { return { nombre: item.nombre }; });
      },
      err => {
        console.log(err);
      }
    );
  }


  ngOnInit() {
    this.cargarPantalla();
  }

  private getRouteParams() {
    this.activatedRoute.paramMap.subscribe(parameters => {
      this.emailParam = parameters.get('email');
      this.rolParam = parameters.get('rol');
    });
  }

  cargarPantalla() {
    this.getRouteParams();
    this.rolSeleccionado = this.rolParam;

    if (this.rolParam == PACIENTE) {
      this.enablePacienteForm();
      this.cargarPaciente();
    }
    else {
      this.cargarUsuario();
    }
  }

  private enablePacienteForm() {
    this.userModificacionForm.addControl("altura", new FormControl(null, [Validators.min(0)]));
    this.userModificacionForm.addControl("peso", new FormControl(null, [Validators.min(0)]));
    this.userModificacionForm.addControl("medidaCintura", new FormControl(null, [Validators.min(0)]));
    this.userModificacionForm.addControl("tipoAlimentacion", new FormControl(null));
  }

  cargarUsuario() {
    this.usersService.getUserById(this.emailParam).subscribe(
      data => {
        this.usuarioModificar = data;
        this.fillFormWithUserData(this.usuarioModificar);
      },
      err => {
        console.error(err);
      }
    );
  }

  cargarPaciente() {
    this.usersService.getPatientById(this.emailParam).subscribe(
      (data) => {
        this.pacienteModificar = data;
        this.fillFormWithPatientData(this.pacienteModificar);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  refreshForm(rol: string) {
    this.rolSeleccionado = rol;

    if (this.rolSeleccionado == PACIENTE) {
      this.enablePacienteForm();
    }
  }

  navigateToUserList() {
    let currentUrl = 'listado-usuarios';
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onSubmit() {
    if (this.userModificacionForm.valid) {

      if (this.rolParam == this.rolSeleccionado) {

        this.updateWithoutRolSelection();
      } else {
        this.updateWithRolSelection();
      }
    }
  }


  private fillFormWithUserData(userData: User) {
    this.userModificacionForm.controls.firstName.setValue(userData.nombre);
    this.userModificacionForm.controls.lastName.setValue(userData.apellido);
    this.userModificacionForm.controls.email.setValue(userData.email);
    this.userModificacionForm.controls.password.setValue(userData.password);
    this.userModificacionForm.controls.fechaNac.setValue(userData.fechaNacimiento ? this.buildMomentForPicker(userData.fechaNacimiento) : null);
    this.userModificacionForm.controls.phoneNumber.setValue(userData.telefono);
    this.rolSeleccionado = userData.rol;
  }

  private fillFormWithPatientData(patientData: Paciente) {
    this.fillFormWithUserData(patientData);
    this.userModificacionForm.controls.altura.setValue(patientData.altura);
    this.userModificacionForm.controls.peso.setValue(patientData.peso);
    this.userModificacionForm.controls.medidaCintura.setValue(patientData.medidaCintura);
    this.userModificacionForm.controls.tipoAlimentacion.setValue(patientData.tipoAlimentacion);
  }

  private buildMomentForPicker(fechaNac: Date): Moment {
    let date = new Date(fechaNac);
    let day = date.getUTCDate();
    let month = date.getUTCMonth();
    let year = date.getUTCFullYear();
    return _moment([year, month, day]);
  }

  private buildDateFromPicker(): Date {
    let moment: Moment = this.userModificacionForm.value['fechaNac'];
    let stringDate = moment.format();
    return new Date(stringDate);
  }

  private buildPacienteForm(): PacienteForm {
    let userForm = this.buildUserForm();
    let paciente: PacienteForm;

    try {
      paciente = userForm as PacienteForm;
      paciente.Altura = this.userModificacionForm.value['altura'];
      paciente.Peso = this.userModificacionForm.value['peso'];
      paciente.MedidaCintura = this.userModificacionForm.value['medidaCintura'];
      paciente.TipoAlimentacion = this.userModificacionForm.value['tipoAlimentacion'];
      paciente.PlanAsignado = this.pacienteModificar.planAsignado;
      //Fijarse si el paciente ya tiene un plan asignado o no para que no rompa al asignar lastAssignment
      if (paciente.PlanAsignado) { paciente.PlanAsignado.lastAssignment = null; }

      return paciente;

    } catch (e) {
      console.log(`Couldn't build Paciente form because ${e}`);
    }

    return null;
  }

  private buildUserForm(): UserForm {
    return {
      'Nombre': this.userModificacionForm.value['firstName'],
      'Apellido': this.userModificacionForm.value['lastName'],
      'Email': this.userModificacionForm.getRawValue()['email'],
      'Password': this.userModificacionForm.value['password'],
      'Rol': this.userModificacionForm.value['rol'],
      'FechaNacimiento': this.buildDateFromPicker(),
      'Telefono': this.userModificacionForm.value['phoneNumber']
    };
  }

  private updateWithoutRolSelection() {
    if (this.rolSeleccionado == PACIENTE) {
      let paciente = this.buildPacienteForm();
      this.updatePacienteInfo(paciente.Email, paciente);
    }
    else {
      let usuario = this.buildUserForm();
      this.updateUserInfo(usuario.Email, usuario);
    }
  }

  private updateWithRolSelection() {
    if ((this.rolParam == ADMIN && this.rolSeleccionado == PACIENTE) || (this.rolParam == NUTRICIONISTA && this.rolSeleccionado == PACIENTE)) {
      let paciente = this.buildPacienteForm();
      this.updatePacienteInfo(paciente.Email, paciente);
    }

    if ((this.rolParam == PACIENTE && this.rolSeleccionado == ADMIN) || (this.rolParam == PACIENTE && this.rolSeleccionado == NUTRICIONISTA)) {
      let paciente = this.buildPacienteForm();
      this.updateUserFromPatient(paciente.Email, paciente);
    }
  }

  private updateUserFromPatient(email: string, paciente: PacienteForm) {
    this.disableFormWhileLoading();
    this.usersService.updateUserWithoutPatientData(email, paciente).subscribe(
      response => {
        let popupRef = this.dialog.open(PopUpComponent, { data: { title: "Listo!", message: "El usuario fue correctamente modificado." } });

        popupRef.afterClosed().subscribe(() => {
          this.navigateToUserList();
        });

      },
      error => {
        this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "No se pudo modificar al usuario." } });

        this.dialog.afterAllClosed.subscribe(() => {
          this.enableFormWhileFinished();
        });
      },
    );
  }

  private updatePacienteInfo(email: string, pacienteForm: PacienteForm) {
    this.disableFormWhileLoading();

    this.usersService.updatePaciente(email, pacienteForm).subscribe(
      data => {
        let popupRef = this.dialog.open(PopUpComponent, { data: { title: "Listo!", message: "El paciente fue correctamente modificado." } });

        popupRef.afterClosed().subscribe(() => {
          this.navigateToUserList();
        });
      },
      err => {
        let popupRef = this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "No se pudo modificar el paciente." } });

        popupRef.afterClosed().subscribe(() => {
          this.enableFormWhileFinished();
        });
      }

    );
  }

  private updateUserInfo(email: string, userForm: UserForm) {
    this.disableFormWhileLoading();

    this.usersService.updateUser(email, userForm).subscribe(
      data => {
        let popupRef = this.dialog.open(PopUpComponent, { data: { title: "Listo!", message: "El usuario fue correctamente modificado." } });

        popupRef.afterClosed().subscribe(() => {
          this.navigateToUserList();
        });
      },
      err => {
        let popupRef = this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "No se pudo modificar el usuario." } });

        popupRef.afterClosed().subscribe(() => {
          this.enableFormWhileFinished();
        });
      }

    );
  }

  private disableFormWhileLoading() {
    this.userModificacionForm.disable({ onlySelf: true });
  }

  private enableFormWhileFinished() {
    this.userModificacionForm.enable({ onlySelf: true });
  }

}
