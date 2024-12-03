import { Component, OnInit } from '@angular/core';
import { IArtist } from '../../../shared/models/artist.model';
import { ArtistService } from '../../../shared/services/artist/artist.service';

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
