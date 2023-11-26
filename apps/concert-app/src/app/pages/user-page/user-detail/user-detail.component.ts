import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      this.user = this.userService.getUserById(Number(p.get('id')));
    })
  }

}
