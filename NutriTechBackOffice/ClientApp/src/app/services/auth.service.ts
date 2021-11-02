import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public userClaims: any;
  public userClaims$ = new Subject<any>();

  constructor(private afAuth: AngularFireAuth) { }

  getUserClaims(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.onAuthStateChanged((user) => {
        if (!!user) {
          this.setUserClaims(user);
          resolve(user);
        } else {
          reject("No user logged in");
        }
      });
    });
  }
  setUserClaims(user: any): void {
    this.userClaims = user;
    this.userClaims$.next(user);
  }
}
