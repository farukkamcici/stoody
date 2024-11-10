import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {

  public email: string = '';
  public password: string = '';

  constructor(
    private authService: AuthService
  ) { }

  public signUp() {
    this.authService.signUp(this.email, this.password)
      .then((res) => {
        console.log("Kayıt başarılı:", res);
      })
      .catch((error) => {
        console.error("Kayıt hatası:", error);
      });
  }

}
