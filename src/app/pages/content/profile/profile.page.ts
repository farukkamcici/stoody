import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  public user: any = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private storage: AngularFireStorage
  ) {}

  ionViewDidEnter() {
    this.getUser();
  }

  public async signOut() {
    await this.authService.signOut();
  }

  public getUser() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
          this.user = { uid: user.uid, ...this.user };
  
          this.userService.getUserData(user.uid).subscribe((data: any) => {
            this.user = { ...this.user, ...data };
            console.log("user in profile", this.user);
          });
        }
      },
      error: (err) => {
        console.error('Kullanıcı bilgileri alınırken hata:', err);
      },
    });
  }
  

  public uploadProfilePicture(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (this.user && this.user.uid) {
        const filePath = `profile_photos/${this.user.uid}_${Date.now()}`;

        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, file);
  
        uploadTask.snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                this.updateUserProfile(url);
              });
            })
          )
          .subscribe();
      } else {
        console.error('User ID is undefined. Cannot upload profile picture.');
      }
    }
  }

  private updateUserProfile(photoURL: string) {
    const userId = this.user.uid;
    const data = { photoURL };

    this.userService.saveUserData(userId, data).then(() => {
      this.user.photoURL = photoURL;
      console.log('Profil fotoğrafı başarıyla güncellendi.');
    }).catch(err => {
      console.error('Profil güncelleme hatası:', err);
    });
  }
}
