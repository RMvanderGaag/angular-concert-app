import { Injectable } from '@angular/core';
import { IConcert } from '../../models/concert.model';
import { HttpClient } from '@angular/common/http';
import { ILocation } from '../../models/location.model';
import { IArtist } from '../../models/artist.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  constructor(private httpClient: HttpClient){}

  private location: ILocation = {
    address: "Kerkstraat 1",
    city: "Breda",
    name: "De kerk",
    capacity: 1000
  }

  private artists: IArtist[] = [
    {
      id: "1",
      name: "Piet",
      genre: "Hardcore",
      birthday: new Date("12/12/2000"),
      country: 't',
      image: ''
    },
    {
      id: "2",
      name: "Frank",
      genre: "Hardstyle",
      birthday: new Date("12/12/2000"),
      country: 't',
      image: ''
    }
  ]

  readonly concerts: IConcert[] = [
    {
      id: "0",
      name: "Boom bam",
      location: this.location,
      date: new Date("12/12/2022"),
      artists:this.artists
    },
    {
      id: "0",
      name: "Dikke fissa",
      location: this.location,
      date: new Date("05/09/2023"),
      artists:this.artists
    },
    {
      id: "0",
      name: "Sinterklaas feest",
      location: this.location,
      date: new Date("12/05/2022"),
      artists:this.artists
    },
    {
      id: "0",
      name: "Feestje",
      location: this.location,
      date: new Date("01/01/2025"),
      artists:this.artists
    }
  ]

  getConcerts(): Observable<IConcert[]> {

    return this.httpClient.get<IConcert[]>('http://localhost:3333/api/data/concert');
  }

  getConcertById(id: string): Observable<IConcert> {
    return this.httpClient.get<IConcert>('http://localhost:3333/api/data/concert/' + id);
  }

  deleteConcert(id: string): Observable<IConcert> {
    return this.httpClient.delete<IConcert>('http://localhost:3333/api/data/concert/' + id);
  }

  addConcert(concert: IConcert): Observable<IConcert> {
    return this.httpClient.post<IConcert>('http://localhost:3333/api/data/concert/', concert);
  }

  updateConcert(concert: IConcert, id: string): Observable<IConcert> {
    return this.httpClient.put<IConcert>('http://localhost:3333/api/data/concert/' + id, concert);
  }
}
