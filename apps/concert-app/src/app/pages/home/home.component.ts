import { ConcertService, IConcert } from '@angular-concert-project/shared';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';

@Component({
  selector: 'angular-concert-project-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit{
  upcomingConcerts: IConcert[] = [];

  constructor(private concertService: ConcertService){}


  ngOnInit(): void {
    this.concertService.getConcerts()
      .pipe(
        map(concerts => 
          concerts
            .filter(concert => {
              const isUpcoming = new Date(concert.date) >= new Date();
              return isUpcoming;
            })
            .sort((a, b) => {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            }) 
            .slice(0, 3)
        )
      )
      .subscribe(
        topConcerts => {
          this.upcomingConcerts = topConcerts;
        }
      );
  }

  
}
