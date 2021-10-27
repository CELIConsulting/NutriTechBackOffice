import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Role } from '../../interfaces/role';
import { User } from '../../interfaces/user';
import { UserForm } from '../../interfaces/user-form';
import { RolesService } from '../../services/roles.service';
import { UsersService } from '../../services/users.service';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { MatDialog } from '@angular/material';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { Router, RouterModule } from '@angular/router';
import * as _moment from 'moment';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent {
  userForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
    fechaNac: [null, Validators.required],
    phoneNumber: [null],
    rol: [null, Validators.required],
  });
  roles: any[] = [];

  loading$ = this.loader.loading$;
  hide = true;

  //Moment.js for DatePicker
  moment = _moment

  constructor(private fb: FormBuilder, private roleService: RolesService, private usersService: UsersService, public dialog: MatDialog, private loader: LoadingSpinnerService, private router: Router) {
    this.fillRoles();
  }

  fillRoles() {
    this.disableFormWhileLoading();
    this.roleService.getRoles().subscribe(
      data => {
        this.roles = data.map(item => { return { nombre: item.nombre } })
        this.enableFormWhileFinished();
      },
      err => {
        console.log(err)
      }
    )
  }

  onSubmit() {
    if (this.userForm.valid) {

      let user: UserForm = {
        'Nombre': this.userForm.value['firstName'],
        'Apellido': this.userForm.value['lastName'],
        'Email': this.userForm.value['email'],
        'Password': this.userForm.value['password'],
        'Rol': this.userForm.value['rol'].nombre,
        'FechaNacimiento': this.userForm.value['fechaNac'],
        'Telefono': this.userForm.value['phoneNumber'],
      };

      this.disableFormWhileLoading();
      //Comment
      console.log(user);
      this.usersService.addUser(user).subscribe(
        data => {
          this.dialog.open(PopUpComponent, { data: { title: "Listo!", message: "El usuario fue correctamente registrado." } });

          this.dialog.afterAllClosed.subscribe(() => {
            this.refreshPantalla()
          })
        },
        err => {
          this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "No se pudo agregar el usuario." } });
          console.error(err);

          this.dialog.afterAllClosed.subscribe(() => {
            this.enableFormWhileFinished();
          })
        }
      )

    }
  }

  private refreshPantalla() {
    console.log("Refreshing component...")
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  private disableFormWhileLoading() {
    this.userForm.disable({ onlySelf: true });
  }

  private enableFormWhileFinished() {
    this.userForm.enable({ onlySelf: true });
  }

}
