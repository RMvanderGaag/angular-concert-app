import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IUser, UserService } from '@angular-concert-project/shared';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: any = {
    name: '',
    city: '',
    birthday: new Date(),
    email: '',
    isAdmin: false
  };
  isEdit: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get("id");
      if (id) {
        this.isEdit = true;
        this.userService.getUserById(id).subscribe((result) => {
          this.user = result
        });
      } else {
        this.isEdit = false;
        this.user = {
          id: 0,
          name: "",
          email: "",
          city: "",
          birthday: new Date(),
          isAdmin: false
        }
      }
    })
  }

  onSubmit(userForm: NgForm): void {
    if (this.isEdit) {
      let editUser = {
        ...userForm.value,
        birthday: new Date(userForm.value.birthday)
      }
      this.userService.updateUser(editUser).subscribe(() => {
        this.router.navigate(['users']);
      })
    } 
  }

}
