import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user/user.service';

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
