import { Injectable } from '@angular/core';
import { IConcert } from '../../models/concert.model';
import { HttpClient } from '@angular/common/http';
import { ILocation } from '../../models/location.model';
import { IArtist } from '../../models/artist.model';
import { Observable } from 'rxjs';
import {environment} from '@angular-concert-project/util-env'

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  constructor(private httpClient: HttpClient){}
  endpoint = environment.dataApiUrl;

  getConcerts(): Observable<IConcert[]> {
    return this.httpClient.get<IConcert[]>(`${this.endpoint}/data/concert`);
  }

  getConcertById(id: string): Observable<IConcert> {
    return this.httpClient.get<IConcert>(`${this.endpoint}/data/concert/${id}`);
  }

  deleteConcert(id: string): Observable<IConcert> {
    return this.httpClient.delete<IConcert>(`${this.endpoint}/data/concert/${id}`);
  }

  addConcert(concert: IConcert): Observable<IConcert> {
    return this.httpClient.post<IConcert>(`${this.endpoint}/data/concert/`, concert);
  }

  updateConcert(concert: IConcert, id: string): Observable<IConcert> {
    return this.httpClient.put<IConcert>(`${this.endpoint}/data/concert/${id}`, concert);
  }
}
