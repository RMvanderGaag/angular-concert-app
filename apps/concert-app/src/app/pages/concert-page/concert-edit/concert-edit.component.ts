import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IConcert } from '../../../shared/models/concert.model';
import { ConcertService } from '../../../shared/services/concert/concert.service';
import { IArtist } from '../../../shared/models/artist.model';

@Component({
  selector: 'app-concert-edit',
  templateUrl: './concert-edit.component.html',
  styleUrls: ['./concert-edit.component.css']
})
export class ConcertEditComponent implements OnInit {
  concert: IConcert | undefined;
  isEdit: boolean = false;
  artists: Array<{id: string; name: string; genre: string; birthday: Date }> = [{id: '', name: '', genre: '', birthday: new Date() }];
  collapsedArtists: boolean[] = [];

  constructor(private concertService: ConcertService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   let id = params.get("id");
    //   if (id) {
    //     this.isEdit = true;

    //     this.concertService.getConcertById(id).subscribe((concert) => {
    //       this.concert = concert;
    //     });

    //   } else {
    //     this.isEdit = false;
    //     this.concert = {
    //       id: "",
    //       name: "",
    //       artists: this.artists,
    //       date: new Date(),
    //       location: {
    //         name: "",
    //         city: "",
    //         address: "",
    //         capacity: 0,
    //       },
    //     };
    //   }
    // });
  }

  onSubmit(concertForm: NgForm): void {
    console.log(concertForm.value);
    if (this.isEdit) {
      let editConcert = {
        ...concertForm.value,
        artists: concertForm.value.artists.includes(",") ? concertForm.value.artists.split(",") : [concertForm.value.artists],
        date: new Date(concertForm.value.date)
      }
      this.concertService.updateConcert(editConcert);
    } else {
      let newConcert = {
        ...concertForm.value,
        artists: concertForm.value.artists.split(",").length > 1 ? concertForm.value.artists.split(",") : [concertForm.value.artists],
        date: new Date(concertForm.value.date)
      };

      this.concertService.addConcert(newConcert);
    }

    this.router.navigate(['concerts']);
  }

  toggleCollapse(index: number) {
    this.collapsedArtists[index] = !this.collapsedArtists[index];
  }

  addArtist(): void {
    this.artists.push({id: '', name: '', genre: '', birthday: new Date()});
  
    this.collapsedArtists.push(false)
  }

  removeArtist(index: number) {
    this.artists.splice(index, 1);
    this.collapsedArtists.splice(index, 1);
}
}
