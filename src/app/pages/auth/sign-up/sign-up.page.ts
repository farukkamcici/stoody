import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {

  public username: string = '';
  public email: string = '';
  public password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) { }

  public signUp() {
    this.authService.signUp(this.email, this.password, this.username)
      .then((res) => {
        console.log("Kayıt başarılı:", res);
        this.router.navigate(['auth/sign-in'])
      })
      .catch((error) => {
        console.error("Kayıt hatası:", error);
      });
  }

  public signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        console.log("Google ile kayıt başarılı:", res);
      })
      .catch((error) => {
        console.error("Google ile kayıt hatası:", error);
      });
  }

  public back() {
    this.location.back();
  }

}
