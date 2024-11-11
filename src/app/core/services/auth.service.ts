import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) { }

  public signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  public signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  public signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

  public signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['auth/onboarding'])
    });
  }

  public isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => {
        console.log("User auth state:", user);
        return user !== null;
      })
    );
  }


  // public isAuthenticated() {
  //   return true
  // }
}
