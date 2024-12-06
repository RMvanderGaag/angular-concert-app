import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User, UserService } from '@angular-concert-project/shared';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User | undefined;
  isEdit: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get("id");
      if (id) {
        this.isEdit = true;
        this.user = this.userService.getUserById(Number(id));
      } else {
        this.isEdit = false;
        this.user = {
          id: 0,
          name: "",
          email: "",
          city: "",
          birthday: new Date()
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
      this.userService.updateUser(editUser)
    } else {
      let newUser = {
        id: this.userService.getUsers().length,
        ...userForm.value,
        birthday: new Date(userForm.value.birthday)
      };
      this.userService.addUser(newUser);
    }

    this.router.navigate(['users']);
  }

}
