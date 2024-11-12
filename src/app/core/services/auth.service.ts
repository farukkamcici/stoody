import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { map, Observable } from 'rxjs';
import { AlertService } from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertService: AlertService
  ) { }

  public signUp(email: string, password: string, username: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user as any;

        if (user) {
          // Kullanıcı profili güncelleniyor
          return updateProfile(user, { displayName: username })
            .then(() => {
              // Kullanıcı veritabanında oluşturuluyor
              return this.db.object(`users/${user.uid}`).set({
                username: username,
                email: email
              });
            });
        }
        return null;
      })
      .catch((error) => {
        console.log("error", error)
        this.handleError(error.code);
        return Promise.reject(error); // Hatanın üst katmanda yakalanabilmesi için Promise.reject kullanıyoruz
      });
  }


  public signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .catch((error: any) => {
        this.handleError(error.code);
        return Promise.reject(error);
      })
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

  private handleError(errorCode: string) {
    let message = '';

    switch (errorCode) {
      case 'auth/invalid-email':
        message = 'Geçersiz e-posta adresi, lütfen geçerli bir e-posta girin.';
        break;
      case 'auth/user-disabled':
        message = 'Bu hesap devre dışı bırakılmış, destekle iletişime geçin.';
        break;
      case 'auth/user-not-found':
        message = 'Bu e-posta adresiyle ilişkilendirilmiş bir kullanıcı bulunamadı.';
        break;
      case 'auth/wrong-password':
        message = 'Yanlış şifre, lütfen tekrar deneyin veya şifrenizi sıfırlayın.';
        break;
      case 'auth/operation-not-allowed':
        message = 'Bu işlem şu anda yapılamıyor, lütfen daha sonra deneyin.';
        break;
      case 'auth/weak-password':
        message = 'Şifre çok zayıf, en az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam içermelidir.';
        break;
      case 'auth/too-many-requests':
        message = 'Çok fazla deneme yapıldı, lütfen biraz bekleyip tekrar deneyin.';
        break;
      case 'auth/network-request-failed':
        message = 'Ağ bağlantısı başarısız, internet bağlantınızı kontrol edin.';
        break;
      case 'auth/requires-recent-login':
        message = 'Bu işlem için tekrar giriş yapmalısınız.';
        break;
      case 'auth/invalid-credential':
        message = 'Geçersiz veya süresi dolmuş kimlik bilgisi, lütfen yeniden giriş yapın.';
        break;
      case 'auth/email-already-in-use':
        message = 'Bu e-posta zaten kullanımda, başka bir e-posta deneyin veya mevcut hesapla giriş yapın.';
        break;
      case 'auth/account-exists-with-different-credential':
        message = 'Bu e-posta başka bir hesapla ilişkilendirilmiş, farklı bir doğrulama yöntemi kullanın.';
        break;
      default:
        message = 'Bir hata oluştu, tekrar deneyin veya destekle iletişime geçin.';
    }

    this.alertService.presentAlert('Hata', message);
  }
}
