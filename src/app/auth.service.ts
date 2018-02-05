import { Injectable } from '@angular/core';
import { AuthHttp, tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { URL } from './app.config';

@Injectable()
export class AuthService {

  url: string = URL;
  constructor(private authHttp: AuthHttp, 
              private http: HttpClient,
              private jwtHelper: JwtHelper) { }

  login(user): Observable<any>  {
    return this.http.post(this.url+'/users/login/', user);
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout(){
    localStorage.removeItem('token');
    console.log('logout');
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.url + '/users/', user);
  }

  updateUser(user: any): Observable<any> {
    return this.authHttp.put(this.url + '/users/', user).map((response: Response) => {
      return response.json();
    });
  }

  createGroup(group: any): Observable<any> {
    return this.authHttp.post(this.url + '/groups/', group).map((response: Response) => {
      return response.json();
    })
  }

  users(): Observable<any> {
    return this.authHttp.get(this.url + '/users/').map((response: Response) => {
      return response.json();
    });
  }

  addUserToGroup(group): Observable<any> {
    return this.authHttp.put(this.url + '/users/groups/' + group.id, {users: [group.user_id]}).map((response: Response) => {
      return response.json();
    });
  }

  removeUserFromGroup(group): Observable<any> {
    return this.authHttp.delete(this.url + '/users/groups/' + group.id + '/' + group.user_id + '/').map((response: Response) => {
      return response.json();
    });
  }

  groups(): Observable<any> {
    return this.authHttp.get(this.url + '/users/groups/').map((response: Response) => {
      return response.json();
    });
  }

  parseToken() {
    let token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token);
  }

}
