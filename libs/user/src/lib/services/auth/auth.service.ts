import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, catchError, of } from 'rxjs';
import { userLogin } from '../../login/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new BehaviorSubject(localStorage.getItem('token') ? true : false);
  url = "http://localhost:3333/api/auth";

  set setLoggedInStatus(status: boolean) {
    this.loggedIn.next(status);
  }


  constructor(private httpClient: HttpClient) { }

  login(data: userLogin) {
    return this.httpClient.post(`${this.url}/login`, data).pipe(
      catchError((error) => {
        return of(error)
      })
    );
  }
}
