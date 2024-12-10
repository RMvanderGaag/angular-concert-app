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

  getUsers(): IUser[] {
    console.log(this.users.length + " users returned")
    return this.users;
  }

  getUserById(id: string): Observable<IUser> {
    console.log(this.url)
    return this.httpClient.get<IUser>(`${this.url}/${id}`);
  }

  deleteUser(id: number) {
    var userToDelete = this.users.findIndex((u) => u.id == id)
    this.users.splice(userToDelete, 1);
  }

  addUser(user: IUser) {
    this.users.push(user);
  }

  updateUser(user: IUser) {
    let editUser = this.users.findIndex((x) => x.id == user.id);
    this.users[editUser] = user;
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('token') || '');
  }

  getLoggedInUser(): Observable<IUser> | null {
    const token = this.getToken();

    if(token){
      try{
        const decoded: any = jwtDecode(token);
        console.log(decoded);
        return this.getUserById(decoded.id);
      }catch(error){
        console.log(error);
      }
    }

    return null;

    // const headers = new HttpHeaders({
    //   'Access-Control-Allow-Origin': '*',
    //   Authorization: `${token}`,
    // });

    // return this.httpClient.get<IUser>("http://localhost:3333/api/data/user" + "/info", {
    //   headers: headers,
    // })

  }
} 
