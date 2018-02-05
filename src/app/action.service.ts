import { Injectable } from '@angular/core';
import { ComponentActions } from './redux-store/actions'
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class ActionService {

  constructor(private componentActions:ComponentActions, private jwtHelper: JwtHelper) { }

  updateUserGlobally(): void{
    let data = this.parseToken();
    this.componentActions.updateUserAction({
      id: data.id,
      username: data.username,
      email: data.email,
      gender: data.gender,
      age: data.age,
    });
  }
  
  parseToken() {
    let token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token);
  }
}
