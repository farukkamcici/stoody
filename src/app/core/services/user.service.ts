import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}

  public saveUserData(userId: string, userData: any): Promise<void> {
    return this.db.object(`users/${userId}`).update(userData);
  }

  public getUserData(userId: string) {
    return this.db.object(`users/${userId}`).valueChanges();
  }
}
