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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.authService.login(this.userLogin).subscribe((res: any) => {
      localStorage.setItem('token', JSON.stringify(res.token));
      this.authService.setLoggedInStatus = true;
      console.log(res);
    });
  }
}
