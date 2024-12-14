import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArtist } from '../../models/artist.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@angular-concert-project/util-env';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  endpoint = environment.dataApiUrl;

  constructor(private httpClient: HttpClient) { }

  getArtists(): Observable<IArtist[]> {

    return this.httpClient.get<IArtist[]>(`${this.endpoint}/data/artist`);
  }

  getArtistById(id: string): Observable<IArtist> {
    return this.httpClient.get<IArtist>(`${this.endpoint}/data/artist/${id}`);
  }

  deleteArtist(id: string): Observable<IArtist> {
    return this.httpClient.delete<IArtist>(`${this.endpoint}/data/artist/${id}`);
  }

  addArtist(artist: IArtist): Observable<IArtist> {
    return this.httpClient.post<IArtist>(`${this.endpoint}/data/artist`, artist);
  }

  udpateArtist(artist: IArtist, id: string): Observable<IArtist> {
    return this.httpClient.put<IArtist>(`${this.endpoint}/data/artist/${id}`, artist);
  }
}
