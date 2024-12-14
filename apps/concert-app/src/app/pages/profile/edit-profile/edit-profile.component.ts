import { AuthService, UserService } from '@angular-concert-project/shared';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'angular-concert-project-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit{
  user: any = {
    name: '',
    city: '',
    birthday: new Date(),
    email: '',
  };

  constructor(private authService: AuthService, private userService: UserService, private router: Router){}
  
  ngOnInit(): void {
    this.authService.getUserFromLocalStorage().subscribe((result) => {
      this.user = result;
    })
  }

  onSubmit(userForm: NgForm): void {
    let editUser = {
      ...userForm.value,
      birthday: new Date(userForm.value.birthday)
    }

      this.userService.updateUser(editUser).subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.router.navigate(['profile']);
      }, error => console.log(error))
  } 
}
