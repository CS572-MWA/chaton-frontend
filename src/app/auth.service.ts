import { Injectable } from '@angular/core';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  url: string = 'http://localhost:3000';
  constructor(private authHttp: AuthHttp) { }

  login(user): Observable<boolean>  {
    return this.authHttp.post(this.url+'/users/login/', user).map((response: Response) => {
      let data = response.json();
      if(data.status == 'success') {
        localStorage.setItem('token', data.data.token);
        return true;
      }
      return false;
    });
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout(){
    localStorage.removeItem('token');
  }

  createUser(user: any): Observable<any> {
    return this.authHttp.post(this.url + '/users/', user).map((response: Response) => {
      return response.json();
    })
  }
}
