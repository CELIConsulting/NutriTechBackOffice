import { CanActivate, Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { take, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class UserLoginGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      take(1),
      switchMap(async (authState) => {
        if (!authState) {
          this.router.navigate(['']);
          return false;
        }
        const token = await authState.getIdTokenResult();

        if (!!token.claims.Paciente) {
          this.auth.auth.signOut();
          this.router.navigate(['']);
          return false;
        }else {
          return true;
        }
      }),
    );
  }

}


