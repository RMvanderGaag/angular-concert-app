import { AuthService, IUser, UserService } from '@angular-concert-project/shared';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { userLogin } from 'libs/shared/src/lib/models/user-login.model';

@Component({
  selector: 'angular-concert-project-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userLogin: userLogin = new userLogin();
  wrongLogin = false;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(loginForm: NgForm) {
    this.authService.login(this.userLogin).subscribe((res: any | undefined) => {
      if (res.error) {
        this.wrongLogin = true;
        return;
      }
      localStorage.setItem('token', JSON.stringify(res.token));

      const user = this.userService.getLoggedInUser();

      if(user){
        user.subscribe((user: IUser) => {
          localStorage.setItem('user', JSON.stringify(user));
        });
      }
      this.authService.loggedIn.next(true);
      this.authService.userIsAdmin.next(true);

      this.router.navigate(["/"]);
    });
  }
}
