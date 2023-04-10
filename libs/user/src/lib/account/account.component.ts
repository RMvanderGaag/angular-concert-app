import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from './user.model';

@Component({
  selector: 'angular-concert-project-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user: User = {} as User;

  constructor(private userServer: UserService) { }

  ngOnInit(): void {
    this.userServer.getLoggedInUser().subscribe((user: User) => {
      this.user = user;
    });
  }
}
