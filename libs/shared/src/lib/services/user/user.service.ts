import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly users: User[] = [
    {
      id: 0,
      name: "Bert",
      city: "Breda",
      email: "bert@mail.com",
      birthday: new Date("05/07/1998")
    },
    {
      id: 1,
      name: "Jan",
      city: "Amsterdam",
      email: "jan@mail.com",
      birthday: new Date("05/07/1998")
    },
    {
      id: 2,
      name: "Simon",
      city: "Rotterdam",
      email: "simon@mail.com",
      birthday: new Date("05/07/1998")
    },
    {
      id: 3,
      name: "Arjan",
      city: "Texel",
      email: "arjan@mail.com",
      birthday: new Date("05/07/1998")
    },
    {
      id: 4,
      name: "Lisa",
      city: "Tilburg",
      email: "lisa@mail.com",
      birthday: new Date("05/07/1998")
    }
  ]

  constructor() {
  }

  getUsers(): User[] {
    console.log(this.users.length + " users returned")
    return this.users;
  }

  getUserById(id: number): User {
    return this.users.filter(x => x.id == id)[0];
  }

  deleteUser(id: number) {
    var userToDelete = this.users.findIndex((u) => u.id == id)
    this.users.splice(userToDelete, 1);
  }

  addUser(user: User) {
    this.users.push(user);
  }

  updateUser(user: User) {
    let editUser = this.users.findIndex((x) => x.id == user.id);
    this.users[editUser] = user;
  }
} 
