import { Injectable } from '@angular/core';
import { IUser } from '../../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import * as dotenv from 'dotenv';
import { environment } from '@angular-concert-project/util-env';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint = environment.dataApiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.endpoint}/data/user`);
  }

  getUserById(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.endpoint}/data/user/${id}`);
  }

  deleteUser(id: string) { 
    return this.httpClient.delete<IUser>(`${this.endpoint}/data/user/${id}`);
  }

  updateUser(user: IUser): Observable<IUser> {
    console.log(user);
    return this.httpClient.put<IUser>(`${this.endpoint}/data/user/${user.id}`, user);
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('token') || '');
  }

  getLoggedInUser(): Observable<IUser> | null {
    const token = this.getToken();

    if(token){
      try{
        const decoded: any = jwtDecode(token);
        return this.getUserById(decoded.id);
      }catch(error){
        console.log(error);
      }
    }

    return null;
  }
} 
