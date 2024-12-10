import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'angular-concert-project-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit{
	loggedIn$!: Observable<boolean> | null;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.loggedIn$ = this.authService.loggedIn;

    if(!this.loggedIn$) return;
    this.userService.getLoggedInUser()?.subscribe((result) => {
      this.isAdmin = result.isAdmin;
    })
  }

  logout() {
    this.authService.logout();
    this.authService.loggedIn.next(false);
  }
}
