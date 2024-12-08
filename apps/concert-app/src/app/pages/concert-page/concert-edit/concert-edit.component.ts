import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ArtistService, IArtist, ConcertService, IConcert } from '@angular-concert-project/shared'

@Component({
  selector: 'app-concert-edit',
  templateUrl: './concert-edit.component.html',
  styleUrls: ['./concert-edit.component.css']
})
export class ConcertEditComponent implements OnInit {
  concert: any = {
    name: '',
    date: new Date().toISOString().split('T')[0],
    price: 0,
    location: {
      address: '',
      city: '',
      name: '',
      capacity: 0
    }
  };
  isEdit: boolean = false;
  artists: IArtist[] = [];
  selectedArtists: any[] = [];
  validArtistAmount: boolean = true;

  constructor(
    private concertService: ConcertService,
    private router: Router,
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    this.artistService.getArtists().subscribe((result) => {
      this.artists = result;
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.concertService.getConcertById(id).subscribe((concert) => {
          this.concert = concert;
          this.concert.date = this.formatDate(this.concert.date)
          if (concert && concert.artists) {
            this.selectedArtists = concert.artists.map((artist: any) => artist.id);
          }
        });
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(concertForm: NgForm): void {
    this.validArtistAmount = this.selectedArtists.length > 0;
    if (concertForm.invalid || !this.validArtistAmount) {
      Object.keys(concertForm.controls).forEach(field => {
        const control = concertForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
    if (concertForm.valid) {
      const updatedConcert = {
        ...this.concert,
        artists: this.selectedArtists.map((id) =>
          this.artists.find((artist) => artist.id === id)
        ),
        date: new Date(concertForm.value.date),
      };

      if (this.isEdit) {
        this.concertService.updateConcert(updatedConcert, updatedConcert.id).subscribe(() => {
          this.router.navigate(['/concerts']);
        });
      } else {
        this.concertService.addConcert(updatedConcert).subscribe(() => {
          this.router.navigate(['/concerts']);
        });
      }
    }
  }
}
