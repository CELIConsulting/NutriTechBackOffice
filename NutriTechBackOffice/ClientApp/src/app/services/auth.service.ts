import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  uid: string = null;
  user: User = null;
  claims: any = {};
  isAdmin = false;
  isNutrittionist = false;

  isLoggedInSubject = new Subject<boolean>();
  userSubject = new Subject();
  claimsSubject = new Subject();
  isAdminSubject = new Subject<boolean>();
  isNuttritionistSubject = new Subject<boolean>();

  constructor(private afAuth: AngularFireAuth) {

    // the only subsription to authState
    this.afAuth.authState
      .subscribe(
        authUser => {

          if (authUser) { // logged in
            this.isLoggedInSubject.next(true);
            this.uid = authUser.uid;

            this.claims = authUser.getIdTokenResult()
              .then(idTokenResult => {
                this.claims = idTokenResult.claims;
                this.isAdmin = this.hasClaim('Admin');
                this.isAdminSubject.next(this.isAdmin);
                this.isAdmin = this.hasClaim('Nutricionista');
                this.isNuttritionistSubject.next(this.isNutrittionist);
                this.claimsSubject.next(this.claims);
              });
          }
          else { // logged out
            console.log('Auth Service says: no User is logged in.');
          }
        }
      );
  }

  isAdminUser() {
    return this.isAdmin;
  }

  isNutrittionistUser() {
    return this.isNutrittionist;
  }

  login(email, password): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.resetState();
    this.afAuth.auth.signOut();
    console.log('User just signed out.');
  }

  hasClaim(claim): boolean {
    return !!this.claims[claim];
  }

  resetState() {
    this.uid = null;
    this.claims = {};
    this.user = null;
    this.isAdmin = false;

    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
    this.claimsSubject.next(this.claims);
    this.userSubject.next(this.user);
  }

}
