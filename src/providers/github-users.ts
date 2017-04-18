import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../pages/users/user.module";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the GithubUsers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GithubUsers {
  githubApiUrl = 'https://api.github.com';

  constructor(public http: Http) {
    console.log('Hello GithubUsers Provider');
  }


  load(): Observable<User[]> {
    return this.http.get(`${this.githubApiUrl}/users`)
      .map(response => <User[]>response.json());
  }

}
