import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';





@Injectable({
  providedIn: 'root'
})
export class UserLoginGuard implements CanActivate {
  constructor(private router: Router, private auth: AngularFireAuth) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Obtenemos la hora sessionstorage
    const usuarioOk = sessionStorage.getItem("sessionToken");

    if (usuarioOk !== undefined && usuarioOk !== null) {
      // const user = admin.auth().verifyIdToken(usuarioOk)
      //   .then(decodedToken => {
      //     // Verified user, add to res.locals for duration of request
      //     console.log("Verified token")
      //     // Si devolvemos TRUE si se permitirá el acceso.
      //     return true;
      //   }).catch(error => {
      //     // Error processing token
      //     console.error("Invalid token");
      //     // Si el usuario esta logeado OK redireccionamos al homeComponent
      //     this.router.navigate(['']);
      //     // Si devolvemos FALSE no de permitirá el acceso
      //     return false;
      //   })
    }
    // Si el usuario esta logeado OK redireccionamos al homeComponent
    this.router.navigate(['']);
    // Si devolvemos FALSE no de permitirá el acceso
    return false;
  }

}


