import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      if (this.authService.isLoggedIn) {
        if (!this.authService.loggedInUser) {
          this.authService.getLoggedInUser();
        }
        if (route.data.role) {
          if (this.authService.authorized(route.data.role)) {
            resolve(true);
          } else {
            this.router.navigate(['/']);
          }
        }
        resolve(true);
      } else {
        this.router.navigate(['/auth/login']);
        reject(false);
      }
    });
  }
}
