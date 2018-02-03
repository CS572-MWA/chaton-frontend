import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class HttpService {

  url: string = 'http://localhost:3000';
  constructor(private http: AuthHttp) {}

  createUser(user: any) {
    return this.http.post(this.url + '/users/', user);
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout(){
    sessionStorage.removeItem('token');
  }
}
