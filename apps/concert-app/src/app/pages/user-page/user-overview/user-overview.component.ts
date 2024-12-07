import { Component, OnInit } from '@angular/core';
import { User, UserService} from '@angular-concert-project/shared';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
  }

}
