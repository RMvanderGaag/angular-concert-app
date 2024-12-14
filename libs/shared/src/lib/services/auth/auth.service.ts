import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { userLogin } from '../../models/user-login.model';
import { IRegisterUser, IUser } from '../../models/user.model';
import { Router } from '@angular/router';
import { environment } from '@angular-concert-project/util-env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new BehaviorSubject(localStorage.getItem('token') ? true : false);
  userIsAdmin = new BehaviorSubject(JSON.parse(localStorage.getItem('user') || '{}')?.isAdmin || false);
  
  endpoint = environment.dataApiUrl;

  set setLoggedInStatus(status: boolean) {
    this.loggedIn.next(status);
  }


  constructor(private httpClient: HttpClient, private router: Router) { }

  login(data: userLogin) {
    return this.httpClient.post(`${this.endpoint}/auth/login`, data).pipe(
      catchError((error) => {
        return of(error)
      })
    );
  }

  register(data: IRegisterUser) {
    return this.httpClient.post(`${this.endpoint}/auth/register`, data);
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
