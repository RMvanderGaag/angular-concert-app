import { Component, OnInit } from '@angular/core';
import { IArtist, ArtistService, AuthService } from '@angular-concert-project/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'angular-concert-project-artist-overview',
  templateUrl: './artist-overview.component.html',
  styleUrls: ['./artist-overview.component.scss'],
})
export class ArtistOverviewComponent implements OnInit {
  constructor(private artistService: ArtistService, private authService: AuthService){}
  

  artists: IArtist[] = [];
  isAdmin: boolean = false;

  ngOnInit(): void {    
    this.isAdmin = this.authService.isAdmin();
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
