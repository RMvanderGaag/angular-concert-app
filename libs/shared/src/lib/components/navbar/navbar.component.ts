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
  currentUser: IUser | null = null;
  userIsAdmin$!: Observable<boolean> | null;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.loggedIn$ = this.authService.loggedIn;
    this.userIsAdmin$ = this.authService.userIsAdmin;

    this.loggedIn$.subscribe((result) => {
      if(result){
        this.userService.getLoggedInUser()?.subscribe((result) => {
          this.currentUser = result;
        })
      }
    })
  }

  logout() {
    this.authService.logout();
    this.authService.userIsAdmin.next(false);
    this.authService.loggedIn.next(false);
  }
}
