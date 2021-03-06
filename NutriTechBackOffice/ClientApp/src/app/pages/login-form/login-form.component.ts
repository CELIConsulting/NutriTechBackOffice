import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    hide: true
  });


  constructor(private fb: FormBuilder, public dialog: MatDialog, private router: Router, public auth: AngularFireAuth) { }


  onSubmit() {
    new Promise((resolve, reject) => {
      this.auth.auth.signInWithEmailAndPassword(this.loginForm.get('email').value, this.loginForm.get('password').value)
        .then((user) => {
          this.router.navigate(['/home']);
        })
        .catch(err => {
          this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "Las credenciales son invalidas." } });
        });
    });

  }
}
