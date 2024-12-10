import { Component, OnInit, Input } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IArtist, IConcert, ConcertService, AuthService, IUser } from '@angular-concert-project/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-concert-overview',
  templateUrl: './concert-overview.component.html',
  styleUrls: ['./concert-overview.component.css']
})
export class ConcertOverviewComponent implements OnInit {
  concerts: IConcert[] = [];
  isAdmin: boolean = false;

  constructor(private concertService: ConcertService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.getAllConcerts();
  }

  getAllConcerts() {
    this.concertService.getConcerts().subscribe((concert: any) => {
      this.concerts = concert;
    });
  }

  deleteConcert(id: string): void {
    this.concertService.deleteConcert(id).subscribe(() => {
      this.getAllConcerts();
    });
  }

  getArtistsDisplay(artists: IArtist[]) {
    if (artists.length === 1) {
      return artists[0].name;
    }

    if (artists.length === 2) {
      return `${artists[0].name}, ${artists[1].name}`;
    }

    return `${artists[0].name}, ${artists[1].name} and ${artists.length - 2} more`;
  }
}
