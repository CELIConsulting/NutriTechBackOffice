import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { ActivatedRoute, Router } from '@angular/router';
import {auth} from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });


  constructor(private fb: FormBuilder, private userService: UsersService, public dialog: MatDialog, private router: Router,public auth: AngularFireAuth) { }


  // onSubmit() {
  //   this.userService.getUserById(this.loginForm.get('email').value).subscribe(
  //     data => {
  //       if (data.password == this.loginForm.get('password').value) {
  //         sessionStorage.setItem("usuarioOk", "Y");
  //         this.router.navigate(['/home'])
  //       }
  //       else {
         
  //         this.dialog.open(PopUpComponent, { data: { title:"Ups hubo un error!",message: "Las credenciales son invalidas."}});
         
  //       }
  //     },
  //     err => {
  //       this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "El usuario no esta registrado, hable con su nutricionista " } });      }
  //   )
  // }

  onSubmit() {
    this.auth.auth.signInWithEmailAndPassword(this.loginForm.get('email').value, this.loginForm.get('password').value)
    .then((user) =>{sessionStorage.setItem("usuarioOk", "Y"), this.router.navigate(['/home'])})
    .catch(err => {    
      this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "Las credenciales son invalidas." } });});
  }

}
