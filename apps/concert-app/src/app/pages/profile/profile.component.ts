import { AuthService, IUser } from '@angular-concert-project/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'angular-concert-project-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit{
  user: IUser | null = null;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.getUserFromLocalStorage().subscribe((result) => {
      this.user = result;
    })
  }
}
