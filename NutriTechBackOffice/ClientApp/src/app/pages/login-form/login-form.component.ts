import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from "../../components/pop-up/pop-up.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { timeout } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"],
})
export class LoginFormComponent {
  loading = false;
  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    hide: true,
  });

  //Flag
  hide = true;
  userClaims: any;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public auth: AngularFireAuth,
    private authService: AuthService
  ) {
  }

  onSubmit() {
    new Promise((resolve, reject) => {
      this.auth.auth
        .signInWithEmailAndPassword(
          this.loginForm.get("email").value,
          this.loginForm.get("password").value
        )
        .then((user) => {
          this.imageLoading();
        })
        .catch((err) => {
          this.dialog.open(PopUpComponent, {
            data: {
              title: "Ups hubo un error!",
              message: "Las credenciales son invalidas.",
            },
          });
          this.loginForm.reset();
        });
    });
  }

  imageLoading() {
    this.loading = false;
    this.authService.getUserClaims().subscribe(data => {
      this.userClaims = data;
      if (this.userClaims != null) {
        this.loading = true;
        if (this.userClaims.Admin) {
          this.router.navigate(["/listado-usuarios"]);
        }
        else if (this.userClaims.Nutricionista) {
          this.router.navigate(["/home"]);
        }
      } else {
        const ref = this.dialog.open(PopUpComponent, {
          data: {
            title: "Ups hubo un error!",
            message: "Su usuario no cuenta con los permisos para acceder.",
          }
        });

        ref.afterClosed().subscribe(() => {
          this.refreshPantalla();
        });
        
        //El claim del paciente viene nulo
        //this.router.navigate(["/home"]);
      }
    }, err => {
      console.log("claims err: ", err);
      this.router.navigate(["/home"]);
    });
  }

  private refreshPantalla() {
    console.log("Refreshing component...");
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
