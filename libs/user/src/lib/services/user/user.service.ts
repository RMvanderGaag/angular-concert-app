import { AuthService } from '@angular-concert-project/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../account/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:3333/api/data/user";

  constructor(private httpClient: HttpClient, private readonly authService: AuthService) { }

  getToken(): string {
    return JSON.parse(localStorage.getItem('token') || '');
  }

  getLoggedInUser(): Observable<User> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.get<User>(this.url + "/info", {
      headers: headers,
    })

  }
}
