import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LogInService } from '../../services/log-in.service';


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


  constructor(private fb: FormBuilder, private logInService: LogInService, public dialog: MatDialog, private router: Router) { }


  onSubmit() {
    this.logInService.authenticate({ 'Email': this.loginForm.get('email').value, 'Password': this.loginForm.get('password').value }).subscribe(
      data => {
        sessionStorage.setItem("sessionToken", data.headers.get("authorization"));
        this.router.navigate(['/home'])
      },
      err => {
        this.dialog.open(PopUpComponent, { data: { title: "Ups hubo un error!", message: "Las credenciales son invalidas." } });
      }
    )
  }
}
