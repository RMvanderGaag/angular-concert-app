import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IConcert } from '../../../shared/models/concert.model';
import { ConcertService } from '../../../shared/services/concert/concert.service';

@Component({
  selector: 'app-concert-detail',
  templateUrl: './concert-detail.component.html',
  styleUrls: ['./concert-detail.component.css']
})
export class ConcertDetailComponent implements OnInit {
  concert: IConcert | undefined;

  constructor(private concertService: ConcertService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((c) => {
      this.concertService.getConcertById(c.get("id")!).subscribe((concert: any) => {
        this.concert = concert;
      });
    })
  }

}
