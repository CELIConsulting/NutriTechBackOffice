import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Role } from '../../interfaces/role';
import { User } from '../../interfaces/user';
import { UserForm } from '../../interfaces/user-form';
import { RolesService } from '../../services/roles.service';
import { UsersService } from '../../services/users.service';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { MatDialog } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth} from 'firebase/app';

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
    rol: [null, Validators.required],
  });
  roles: any[] = [];
  

  constructor(private fb: FormBuilder, private roleService: RolesService, private usersService: UsersService, public dialog: MatDialog,public auth: AngularFireAuth) {
    this.fillRoles();
  }

  fillRoles() {
    this.roleService.getRoles().subscribe(
      data => {
        this.roles = data.map(item => { return { nombre: item.nombre} })
      },
      err => {
        console.log(err)
      }
    )
  }

  // onSubmit() {
  //   if (this.userForm.valid) {
  //     let user: UserForm = {
  //       'Nombre': this.userForm.value['firstName'],
  //       'Apellido': this.userForm.value['lastName'],
  //       'Email': this.userForm.value['email'],
  //       'Password': this.userForm.value['password'],
  //       'Rol': this.userForm.value['rol'].nombre,
  //     };

  //     this.usersService.addUser(user).subscribe(
  //       data => {
  //         this.dialog.open(PopUpComponent, { data: { title: "Listo!", message: "El usuario fue correctamente registrado." } });

  //       },
  //       err => {
  //         this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "No se pudo agregar el usuario." } });

  //       }
  //     )

  //   }
  // }

  onSubmit() {
    if (this.userForm.valid) {
      let user: UserForm = {
        'Nombre': this.userForm.value['firstName'],
        'Apellido': this.userForm.value['lastName'],
        'Email': this.userForm.value['email'],
        'Password': this.userForm.value['password'],
        'Rol': this.userForm.value['rol'].nombre,
      };

      this.usersService.addUser(user).subscribe(
        data => {
          this.auth.auth.createUserWithEmailAndPassword(this.userForm.value['email'],this.userForm.value['password'] );
          this.dialog.open(PopUpComponent, { data: { title: "Listo!", message: "El usuario fue correctamente registrado." } });

        },
        err => {
          this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "No se pudo agregar el usuario." } });

        }
      )

    }
  }
}
