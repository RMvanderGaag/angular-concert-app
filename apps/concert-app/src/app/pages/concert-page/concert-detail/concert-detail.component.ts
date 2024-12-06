import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IConcert, ConcertService } from '@angular-concert-project/shared'

@Component({
  selector: 'app-concert-detail',
  templateUrl: './concert-detail.component.html',
  styleUrls: ['./concert-detail.component.css']
})
export class ConcertDetailComponent implements OnInit {
  concert: IConcert | undefined;

  constructor(private concertService: ConcertService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((c) => {
      this.concertService.getConcertById(c.get("id")!).subscribe((concert: any) => {
        this.concert = concert;
        console.log(concert);
      });
    })
  }

  navigateToArtistDetail(artistId: string) {
    this.router.navigate(['/artists', artistId]);
  }

}
