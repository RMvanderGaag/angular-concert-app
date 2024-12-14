import { Component, OnInit } from '@angular/core';
import { AuthService, IUser, UserService} from '@angular-concert-project/shared';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit {
users: IUser[] = [];
errMsg: string | null = null;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((result) => {
      this.users = result;
    })
  }

  deleteUser(id: number) {
    this.authService.getUserFromLocalStorage().subscribe((result) => {
      if(id.toString() == result.id){ 
        this.errMsg = "Cannot delete logged in user"
        return;
      }
      this.userService.deleteUser(id.toString()).subscribe(() => {
        this.getUsers();
      })
    })

  }

}
