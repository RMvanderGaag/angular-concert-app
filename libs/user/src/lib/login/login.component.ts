import { Component, OnInit } from '@angular/core';
import { AuthService } from '@angular-concert-project/user';
import { userLogin } from './user-login.model';

@Component({
  selector: 'angular-concert-project-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLogin: userLogin = new userLogin();
  wrongLogin = false;

  constructor(private authService: AuthService) { }

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
    });
  }
}
