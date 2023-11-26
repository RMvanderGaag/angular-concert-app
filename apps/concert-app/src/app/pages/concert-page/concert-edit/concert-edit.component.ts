import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from '../../../shared/models/concert.model';
import { ConcertService } from '../../../shared/services/concert/concert.service';

@Component({
  selector: 'app-concert-edit',
  templateUrl: './concert-edit.component.html',
  styleUrls: ['./concert-edit.component.css']
})
export class ConcertEditComponent implements OnInit {
  concert: Concert | undefined;
  isEdit: boolean = false;

  constructor(private concertService: ConcertService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get("id");
      if (id) {
        this.isEdit = true;
        this.concert = this.concertService.getConcertById(Number(id))!;
      } else {
        this.isEdit = false;
        this.concert = {
          id: 0,
          name: "",
          artists: [],
          date: new Date(),
          location: "",
          eighteenPlus: false
        }
      }
    });
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
        id: this.concertService.getConcerts().length,
        ...concertForm.value,
        artists: concertForm.value.artists.split(",").length > 1 ? concertForm.value.artists.split(",") : [concertForm.value.artists],
        date: new Date(concertForm.value.date)
      };

      this.concertService.addConcert(newConcert);
    }

    this.router.navigate(['concerts']);
  }
}
