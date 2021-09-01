import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Role } from '../../interfaces/role';
import { User } from '../../interfaces/user';
import { UserForm } from '../../interfaces/user-form';
import { RolesService } from '../../services/roles.service';
import { UsersService } from '../../services/users.service';

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

  constructor(private fb: FormBuilder, private roleService: RolesService, private usersService: UsersService) {
    this.fillRoles();
  }

  fillRoles() {
    this.roleService.getRoles().subscribe(
      data => {
        this.roles = data.map(item => { return { nombre: item.nombre, id: item.id } })
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
        'Rol': null,
      };
      this.roleService.getRole(this.userForm.value['rol'].id).subscribe(
        data => {
          user.Rol = data
          this.usersService.addUser(user).subscribe(
            data => {
              console.log(data)
            },
            err => {
              console.log(err)
            }
          )
        },
        err => {
          console.log(err)
        }
      )

    }
  }
}
