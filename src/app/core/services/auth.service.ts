import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
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
    return this.afAuth.signOut();
  }

  public isAuthenticated() {
    return true;
    // return this.afAuth.authState;
  }
}
