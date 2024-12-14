import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}

	canActivate() {
		let isAdmin = false;

		return this.authService.getUserFromLocalStorage().pipe(
			map((user) => {
				if(!user) this.router.navigate(["/"]); 
				isAdmin = user.isAdmin;
				if(!isAdmin) this.router.navigate(["/"]);
						return isAdmin;
				})
		);
	}
  
}
