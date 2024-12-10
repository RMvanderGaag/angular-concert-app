import { AuthService } from '@angular-concert-project/shared';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'angular-concert-project-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user: any = {
    name: '',
    email: '',
    city: '',
    birthday: new Date(),
    password: ''
  };

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(registerForm: NgForm) {
    if (registerForm.invalid) {
      Object.keys(registerForm.controls).forEach(field => {
        const control = registerForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.authService.register(registerForm.value).subscribe(() => {
      this.router.navigate(["/login"]);
    });

  }
}
