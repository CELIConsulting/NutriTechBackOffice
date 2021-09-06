import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Obtenemos la hora sessionstorage 
    const usuarioOk = sessionStorage.getItem("usuarioOk");

    if (usuarioOk !=="Y" ) {
      // Si el usuario esta logeado OK redireccionamos al homeComponent
      this.router.navigate(['']);
      // Si devolvemos FALSE no de permitirá el acceso
      return false;
    }

    // Si devolvemos TRUE si se permitirá el acceso.
    return true;
  }

}
  

