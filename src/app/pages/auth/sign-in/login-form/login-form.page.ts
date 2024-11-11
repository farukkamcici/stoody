import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage {
  public email: string = '';
  public password: string = '';

  constructor(
    private authService: AuthService,
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

}
