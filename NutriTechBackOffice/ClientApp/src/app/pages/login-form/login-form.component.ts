import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { ActivatedRoute, Router } from '@angular/router';


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


  constructor(private fb: FormBuilder, private userService: UsersService, public dialog: MatDialog, private router: Router) { }

  onSubmit() {
    this.userService.getUserById(this.loginForm.get('email').value).subscribe(
      data => {
        if (data.password == this.loginForm.get('password').value) {
          sessionStorage.setItem("usuarioOk", "Y");
          this.router.navigate(['/home'])
        }
        else {
         
            this.dialog.open(PopUpComponent);
         
        }
      },
      err => {
        this.dialog.open(PopUpComponent);
      }
    )
  }
}
