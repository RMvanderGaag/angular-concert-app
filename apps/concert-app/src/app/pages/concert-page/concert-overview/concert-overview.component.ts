import { Component, OnInit, Input } from '@angular/core';
import { IConcert } from '../../../shared/models/concert.model';
import { ConcertService } from '../../../shared/services/concert/concert.service';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-concert-overview',
  templateUrl: './concert-overview.component.html',
  styleUrls: ['./concert-overview.component.css']
})
export class ConcertOverviewComponent implements OnInit {
  concerts: IConcert[] = [];

  constructor(private concertService: ConcertService) { }

  ngOnInit(): void {
    this.concertService.getConcerts().subscribe((concert: any) => {
      this.concerts = concert;
    });
    console.log(this.concerts);
  }

  deleteConcert(id: string): void {
    this.concertService.deleteConcert(id);
  }
}
