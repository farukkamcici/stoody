import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  public saveUserData(userId: string, userData: any): Promise<void> {
    return this.db.object(`users/${userId}`).update(userData);
  }

  public getUserData(userId: string) {
    return this.db.object(`users/${userId}`).valueChanges();
  }

}
