import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'angular-concert-project-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit{
  @Input() user!: { name: string; email: string; city: string; birthday: string };

  ngOnInit(): void {
    console.log(this.user);
  }
}
