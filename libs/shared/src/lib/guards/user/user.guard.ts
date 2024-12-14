import { AuthService } from '@angular-concert-project/shared';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

	canActivate() {
		let isLoggedIn = false;

		return this.authService.getUserFromLocalStorage().pipe(
			map((user) => {
				user ? (isLoggedIn = true) : (isLoggedIn = false);
        if(!user) this.router.navigate(["/"]); 

				return isLoggedIn;
			})
		);
	}
  
}
