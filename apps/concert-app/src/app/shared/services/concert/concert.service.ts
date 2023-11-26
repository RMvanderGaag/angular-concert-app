import { Injectable } from '@angular/core';
import { Concert } from '../../models/concert.model';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  readonly concerts: Concert[] = [
    {
      id: 0,
      name: "Boom bam",
      eighteenPlus: false,
      location: "Breda",
      date: new Date("12/12/2022"),
      artists: ["Piet", "Frank", "Jan"]
    },
    {
      id: 1,
      name: "Dikke fissa",
      eighteenPlus: true,
      location: "Amsterdam",
      date: new Date("05/09/2023"),
      artists: ["Wim", "Hans"]
    },
    {
      id: 2,
      name: "Sinterklaas feest",
      eighteenPlus: false,
      location: "Oosterhout",
      date: new Date("12/05/2022"),
      artists: ["Stroopwafel piet", "Sinterklaar", "Coole piet", "Piet"]
    },
    {
      id: 3,
      name: "Feestje",
      eighteenPlus: true,
      location: "Texel",
      date: new Date("01/01/2025"),
      artists: ["Dirk"]
    },
    {
      id: 4,
      name: "AC/DC tribuut concert",
      eighteenPlus: false,
      location: "Breda",
      date: new Date("08/08/2024"),
      artists: ["Jan-leen", "Ria", "Sanne", "Marjolein"]
    },
  ]

  constructor() { }

  getConcerts(): Concert[] {
    return this.concerts;
  }

  getConcertById(id: number): Concert | null {
    return this.concerts.find(c => c.id === id) ?? null;
  }

  deleteConcert(id: number): void {
    this.concerts.splice(this.concerts.findIndex(c => c.id === id), 1);
  }

  addConcert(concert: Concert): void {
    this.concerts.push(concert);
  }

  updateConcert(concert: Concert): void {
    this.concerts[this.concerts.findIndex(c => c.id === concert.id)] = concert;
  }
}
