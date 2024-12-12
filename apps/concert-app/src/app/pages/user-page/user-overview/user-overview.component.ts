import { Component, OnInit } from '@angular/core';
import { IUser, UserService} from '@angular-concert-project/shared';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit {
users: IUser[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((result) => {
      this.users = result;
    })
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id.toString())!.add(() => {
      this.getUsers();
    })
  }

}
