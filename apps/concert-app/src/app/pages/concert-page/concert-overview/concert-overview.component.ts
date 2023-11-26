import { Component, OnInit } from '@angular/core';
import { Concert } from '../../../shared/models/concert.model';
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
  concerts: Concert[] = [];

  constructor(private concertService: ConcertService) { }

  ngOnInit(): void {
    this.concerts = this.concertService.getConcerts();
    console.log(this.concerts);
  }

  deleteConcert(id: number): void {
    this.concertService.deleteConcert(id);
  }

}
