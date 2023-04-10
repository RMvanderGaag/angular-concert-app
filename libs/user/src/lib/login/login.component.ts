import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@angular-concert-project/user';
import { userLogin } from './user-login.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { User } from '../account/user.model';

@Component({
  selector: 'angular-concert-project-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLogin: userLogin = new userLogin();
  wrongLogin = false;
  @Output() showAccount: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.authService.login(this.userLogin).subscribe((res: any | undefined) => {
      if (res.error) {
        this.wrongLogin = true;
        return;
      }
      localStorage.setItem('token', JSON.stringify(res.token));
      this.authService.setLoggedInStatus = true;
      this.userService.getLoggedInUser().subscribe((user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.showAccount.emit();
      });
    });
  }
}
