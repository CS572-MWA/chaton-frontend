import { Injectable } from '@angular/core';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  url: string = 'http://localhost:3000';
  constructor(private authHttp: AuthHttp) { }

  login(user): Observable<boolean>  {
    return this.authHttp.post(this.url+'/login', user).map((response: Response) => {
      let token = response.json();
      if(token) {
        sessionStorage.setItem('token', token);
        return true;
      }
      return false;
    });
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout(){
    sessionStorage.removeItem('token');
  }
}
