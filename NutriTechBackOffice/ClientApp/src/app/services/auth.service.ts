import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from "rxjs";
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {
  }

  getUserClaims(): any {
    return this.auth.authState.pipe(
      take(1),
      switchMap(async (authState) => {
        if (!authState) {
          return null;
        }
        const token = await authState.getIdTokenResult();

        if (!!token.claims.Paciente) {
          return null;
        }
        return token.claims;
      }),
    );
  }
}
