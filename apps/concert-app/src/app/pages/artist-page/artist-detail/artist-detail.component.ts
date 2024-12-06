import { Component, OnInit } from '@angular/core';
import { IArtist, ArtistService } from '@angular-concert-project/shared'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'angular-concert-project-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
})
export class ArtistDetailComponent implements OnInit{
  artist: any;
  imageUrl: string = "assets/img/default-profile.jpg";

  constructor(private artistService: ArtistService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((a) => {
      this.artistService.getArtistById(a.get("id")!).subscribe((artist: any) => {
        this.artist = artist;

        this.resolveImage();
      });
    })
  }

  resolveImage(): void {
    if(this.artist.image == null) return;
    this.imageUrl = this.artist.image
  }
}
