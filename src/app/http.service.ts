import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  url: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  createUser(user: any) {
    return this.http.post(this.url + '/users/', user);
  }

}
