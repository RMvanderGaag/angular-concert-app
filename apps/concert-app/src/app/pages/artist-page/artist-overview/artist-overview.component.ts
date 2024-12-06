import { Component, OnInit } from '@angular/core';
import { IArtist, ArtistService } from '@angular-concert-project/shared';

@Component({
  selector: 'angular-concert-project-artist-overview',
  templateUrl: './artist-overview.component.html',
  styleUrls: ['./artist-overview.component.scss'],
})
export class ArtistOverviewComponent implements OnInit {
  constructor(private artistService: ArtistService){}

  artists: IArtist[] = [];

  ngOnInit(): void {
    this.getAllArtists();
  }

  getAllArtists() {    
    this.artistService.getArtists().subscribe((a) => {
      this.artists = a;
    })
  }

  deleteArtist(id: string): void {
    this.artistService.deleteArtist(id).subscribe(() => {
      this.getAllArtists();
    })
  }

}
