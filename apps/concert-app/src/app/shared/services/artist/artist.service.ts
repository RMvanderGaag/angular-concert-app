import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArtist } from '../../models/artist.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private httpClient: HttpClient) { }

  getArtists(): Observable<IArtist[]> {

    return this.httpClient.get<IArtist[]>('http://localhost:3333/api/data/artist');
  }

  getArtistById(id: string): Observable<IArtist> {
    return this.httpClient.get<IArtist>('http://localhost:3333/api/data/artist/' + id);
  }

  deleteArtist(id: string): Observable<IArtist> {
    return this.httpClient.delete<IArtist>('http://localhost:3333/api/data/artist/' + id);
  }

  addArtist(artist: IArtist): Observable<IArtist> {
    return this.httpClient.post<IArtist>('http://localhost:3333/api/data/artist/', artist);
  }

  udpateArtist(artist: IArtist, id: string): Observable<IArtist> {
    return this.httpClient.put<IArtist>('http://localhost:3333/api/data/artist/' + id, artist);
  }
}
