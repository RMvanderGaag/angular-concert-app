import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concert } from '../concert.model';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  url = 'http://localhost:3333/api/data/concert';

  constructor(private httpClient: HttpClient) { }

  createConcert(concert: Concert): Observable<Concert> {
    const token = JSON.parse(localStorage.getItem('token') || '');
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.post<Concert>(this.url, concert, {
      headers: headers
    });
  }
}
