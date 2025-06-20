import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {

  public email: string = '';
  public password: string = '';

  constructor(private authService: AuthService,
    private router: Router,
  ) { }

  public signIn() {
    this.authService.signIn(this.email, this.password)
      .then((res) => {
        console.log("Giriş başarılı:", res);
        this.router.navigate(['content/home'])
      })
      .catch((error) => {
        console.error("Giriş hatası:", error);
      });
  }

  public signUp() {
    this.router.navigate(['auth/sign-up'])

  }

  public signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        console.log("Google ile giriş başarılı:", res);
      })
      .catch((error) => {
        console.error("Google ile giriş hatası:", error);
      });
  }

}
