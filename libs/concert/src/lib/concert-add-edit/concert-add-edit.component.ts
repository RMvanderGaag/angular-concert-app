import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Concert } from '../concert.model';
import { ConcertService } from '../services/concert.service';

@Component({
  selector: 'angular-concert-project-concert-add-edit',
  templateUrl: './concert-add-edit.component.html',
  styleUrls: ['./concert-add-edit.component.scss'],
})
export class ConcertAddEditComponent {
  concert: Concert = {} as Concert;

  constructor(private concertService: ConcertService, private router: Router) { }

  onSubmit() {
    this.concertService.createConcert(this.concert).subscribe(() => {
      this.router.navigate(['/concerts']);
    });
  }
}
