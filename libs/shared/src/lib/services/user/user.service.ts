import { Injectable } from '@angular/core';
import { IUser } from '../../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import * as dotenv from 'dotenv';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `http://localhost:3333/api/data/user`

  readonly users: IUser[] = [
    {
      id: 0,
      name: "Bert",
      city: "Breda",
      email: "bert@mail.com",
      birthday: new Date("05/07/1998"),
      isAdmin: false
    },
    {
      id: 1,
      name: "Jan",
      city: "Amsterdam",
      email: "jan@mail.com",
      birthday: new Date("05/07/1998"),
      isAdmin: false
    },
    {
      id: 2,
      name: "Simon",
      city: "Rotterdam",
      email: "simon@mail.com",
      birthday: new Date("05/07/1998"),
      isAdmin: false
    },
    {
      id: 3,
      name: "Arjan",
      city: "Texel",
      email: "arjan@mail.com",
      birthday: new Date("05/07/1998"),
      isAdmin: false
    },
    {
      id: 4,
      name: "Lisa",
      city: "Tilburg",
      email: "lisa@mail.com",
      birthday: new Date("05/07/1998"),
      isAdmin: false
    }
  ]

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.url}`);
  }

  getUserById(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.url}/${id}`);
  }

  deleteUser(id: string) {
    // let currentUser: any = null;
    // return this.getLoggedInUser()?.subscribe((result) => {
    //   console.log(result);
    //   currentUser = result;
    //   if(currentUser.id == id) throw Error("Cannot delete logged in user");
      
    return this.httpClient.delete<IUser>(`${this.url}/${id}`);
    // })
  }

  updateUser(user: IUser): Observable<IUser> {
    console.log(user);
    return this.httpClient.put<IUser>(`${this.url}/${user.id}`, user);
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
