import { Component, Input } from '@angular/core';
import { IUser } from '../../../models/user.model';

@Component({
  selector: 'angular-concert-project-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  @Input() user: IUser|null = null;
}
