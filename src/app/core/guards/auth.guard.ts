import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    switchMap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['auth/onboarding']);
        return of(false);
      }
      return authService.getCurrentUser().pipe(
        switchMap((user) => {
          if (!user) {
            router.navigate(['auth/onboarding']);
            return of(false);
          }
          return userService.getUserData(user.uid).pipe(
            switchMap((userData) => {
              if (!userData || !isUserDataComplete(userData)) {
                console.log("No user data or incomplete data!");
                return router.navigate(['auth/personalize']).then(() => false);
              }
              console.log("Yes user data and complete!");
              return of(true);
            })
          );
        })
      );
    })
  );
};

function isUserDataComplete(userData: any): boolean {
  return (
    !!userData.username &&
    !!userData.email &&
    !!userData.birthDate &&
    !!userData.goal
  );
}
