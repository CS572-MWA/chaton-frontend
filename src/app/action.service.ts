import { Injectable } from '@angular/core';
import { ComponentActions } from './redux-store/actions'
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class ActionService {

  constructor(private componentActions:ComponentActions, private jwtHelper: JwtHelper) { }

  updateUser(): void{
    let data = this.parseToken();
    this.componentActions.updateUserAction({
      id: data.id,
      username: data.username,
      email: data.email,
      gender: data.gender,
      age: data.age,
    });
  }

  addGroup(groups): void {
    for(let group of groups) {
      this.componentActions.addGroup({
        id: group._id,
        name: group.name,
        users: group.users,
      });
    }
  }

  addUsersToGroup(data): void {
    this.componentActions.addUserToGroup({
      id: data.id,
      users: data.users
    })
  }

  removeUserFromGroup(data): void {
    let current_user = this.parseToken();
    this.componentActions.removeUserFromGroup({
      id: data.id,
      user_id: data.user_id,
      current_user_id: current_user.id
    })
  }

  clear() {
    this.componentActions.clear();
  }
  
  parseToken() {
    let token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token);
  }
}
