import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { userLogin } from '../../models/user-login.model';
import { IRegisterUser, IUser } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new BehaviorSubject(localStorage.getItem('token') ? true : false);
  userIsAdmin = new BehaviorSubject(JSON.parse(localStorage.getItem('user') || '{}')?.isAdmin || false);
  
  url = "http://localhost:3333/api/auth";

  set setLoggedInStatus(status: boolean) {
    this.loggedIn.next(status);
  }


  constructor(private httpClient: HttpClient, private router: Router) { }

  login(data: userLogin) {
    return this.httpClient.post(`${this.url}/login`, data).pipe(
      catchError((error) => {
        return of(error)
      })
    );
  }

  register(data: IRegisterUser) {
    return this.httpClient.post(`${this.url}/register`, data);
  }

  logout() {
    this.router.navigate(["/"]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }


  getUserFromLocalStorage() {
    const userData = localStorage.getItem('user');
    if(userData){
      const localUser = JSON.parse(userData);
      return of(localUser);
    }else{
      return of(undefined);
    }
  }

  isAdmin(): boolean {
    const userData = localStorage.getItem('user');
    if (userData) {
      const localUser: IUser = JSON.parse(userData);
      return localUser.isAdmin === true;
    }
    return false;
  }
}