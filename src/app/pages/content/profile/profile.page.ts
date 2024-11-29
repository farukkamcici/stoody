import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  public user: any = null; // Initialize user as null

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ionViewDidEnter() {
    this.getUser();
  }

  public async signOut() {
    await this.authService.signOut();
    this.router.navigate(['/login']); // Redirect to login after sign-out
  }

  public getUser() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user; // Assign the user details to the `user` property
        console.log('User:', this.user);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      },
    });
  }
}
