import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IArtist } from '../../../shared/models/artist.model';
import { ArtistService } from '../../../shared/services/artist/artist.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'angular-concert-project-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.scss'],
})
export class ArtistEditComponent implements OnInit {
  constructor(private artistService: ArtistService, private route: ActivatedRoute, private router: Router){}

  artist: any = {
    name: '',
    genre: '',
    birthday: new Date(),
    country: '',
    image: null
  };
  isEdit: boolean = false;
  imgSrc: string = '';
  base64Img: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.artistService.getArtistById(id).subscribe((result) => {
          this.artist = result;
          this.base64Img = result.image;
          this.artist.birthday = this.formatDate(result.birthday.toString());
        });
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    this.toBase64(reader, file).then((result) => {
      this.base64Img = result
    })
  }

  toBase64 = (fileReader: FileReader, file: any) => 
    new Promise((resolve, reject) => {
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    })

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  onSubmit(artistForm: NgForm): void {
    if(this.base64Img != undefined){
      this.artist.image = this.base64Img;
    }else{
      this.artist.image = "assets/img/default-profile.jpg";
    }

    let newArtist = {
      ...artistForm.value,
      birthday: new Date(artistForm.value.birthday),
      image: this.artist.image
    };

    if(this.isEdit) this.artistService.udpateArtist(newArtist, newArtist.id).subscribe(() => {
      this.router.navigate(['artists'])
    });
    else this.artistService.addArtist(newArtist).subscribe(() => {
      this.router.navigate(['artists'])
    });;
  }
}
