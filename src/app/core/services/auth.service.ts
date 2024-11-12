import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
  ) { }

  public signUp(email: string, password: string, username: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      const user = userCredential.user as any;

      if (user) {
        updateProfile(user, {
          displayName: username
        });

        return this.db.object(`users/${user.uid}`).set({
          username: username,
          email: email
        });
      }
      return null;
    });
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
