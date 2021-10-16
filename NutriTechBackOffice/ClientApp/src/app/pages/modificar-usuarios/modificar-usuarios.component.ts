import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Role } from '../../interfaces/role';
import { User } from '../../interfaces/user';
import { UserForm } from '../../interfaces/user-form';
import { RolesService } from '../../services/roles.service';
import { UsersService } from '../../services/users.service';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { MatDialog } from '@angular/material'



@Component({
  selector: 'app-modificar-usuarios',
  templateUrl: './modificar-usuarios.component.html',
  styleUrls: ['./modificar-usuarios.component.css']
})
export class ModificarUsuariosComponent implements OnInit {
  usuarioModificar: User;
  rol: Role;
  rolSeleccionado: string;
  

  userModificacionForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null],
    password: [null, Validators.required],
    rol: [null, Validators.required],
  });
  roles: any[] = [];
  constructor(private fb: FormBuilder, private roleService: RolesService, private usersService: UsersService, public dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: Router) {
    this.fillRoles();
  }


  fillRoles() {
    this.roleService.getRoles().subscribe(
      data => {
        this.roles = data.map(item => { return { nombre: item.nombre } })
      },
      err => {
        console.log(err)
      }
    )
  }


  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    var emailUsuario = this.activatedRoute.snapshot.params.email;
    this.usersService.getUserById(emailUsuario).subscribe(
      data => {
        this.usuarioModificar = data;
        this.userModificacionForm.controls.firstName.setValue(this.usuarioModificar.nombre);
        this.userModificacionForm.controls.lastName.setValue(this.usuarioModificar.apellido);
        this.userModificacionForm.controls.email.setValue(this.usuarioModificar.email);
        this.userModificacionForm.controls.password.setValue(this.usuarioModificar.password);
        this.rolSeleccionado = this.usuarioModificar.rol;
      },
      err => {

      }
    )
  }


  private navigateToUserList() {
    let currentUrl = 'listado-usuarios';
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onSubmit() {
    if (this.userModificacionForm.valid) {
      let user: UserForm = {
        'Nombre': this.userModificacionForm.value['firstName'],
        'Apellido': this.userModificacionForm.value['lastName'],
        'Email': this.userModificacionForm.value['email'],
        'Password': this.userModificacionForm.value['password'],
        'Rol': this.userModificacionForm.value['rol'],
        //TODO: Agregar inputs al form
        'FechaNacimiento': null,
        'Telefono': null,
      };

      //servicio de actualizacion
      console.dir(user);
      this.usersService.updateUser(user.Email, user).subscribe(
        data => {
          this.dialog.open(PopUpComponent, { data: { title: "Listo!", message: "El usuario fue correctamente modificado." } });

          this.dialog.afterAllClosed.subscribe(() => {
            this.navigateToUserList()
          })
        },
        err => {
          this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "No se pudo modificar el usuario." } });

        }

      )
      
    }
  }
}
