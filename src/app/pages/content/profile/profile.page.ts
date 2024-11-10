import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public async signOut() {
    await this.authService.signOut();
    return this.router.navigate(['auth/onboarding']);
  }
}
