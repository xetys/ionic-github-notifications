import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";
import {Observable} from "rxjs/Observable";
import {isUndefined} from "ionic-angular/util/util";

/*
  Generated class for the GithubAuth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GithubAuth {

  authenticated: boolean = false;
  gitHubApiUrl = 'https://api.github.com';
  httpBasicAuth: string;
  loaded: boolean = false;

  constructor(
    public http: Http,
    public storage: Storage
  ) {
    this.storage.ready().then(() => {
        storage.get('gha').then(authString => {
          this.httpBasicAuth = authString;
          this.checkAuth().subscribe();
        }).catch((err) => {
          console.log('on get gha', err);
        });
    });
  }

  setLoginCredentials(userName: string, password: string) {
    this.httpBasicAuth = btoa(`${userName}:${password}`);
  }


  checkAuth(): Observable<boolean> {
    //skip request if no header is given
    if(isUndefined(this.httpBasicAuth) || this.httpBasicAuth == null) {
      this.loaded = true;
      return new Observable<boolean>(subscriber => subscriber.next(false));
    }


    return this.http.get(`${this.gitHubApiUrl}/user`, {headers: this.getAuthHeaders()})
      .map(response => {
        this.loaded = true;
        if (response.status == 401) {
          if (!isUndefined(response.json()["message"]) && response.json()["message"] == "Bad credentials") {
            this.storage.remove('gha');
          }
          this.authenticated = false;
        } else {
          this.authenticated = true;
        }

        return this.authenticated;
      });
  }


  login(userName: string, password: string): Observable<boolean> {
    this.setLoginCredentials(userName, password);
    return this.checkAuth().map(isAuthenticated => {
      if (isAuthenticated) {
        this.storage.set('gha', this.httpBasicAuth);
        return true;
      } else {
        return false;
      }
    });
  }


  logout(): Promise<any> {
    this.httpBasicAuth = null;
    this.authenticated = false;
    return this.storage.remove('gha');
  }


  getAuthHeaders(): Headers {
    const headers = new Headers();
    headers.append("Authorization", `Basic ${this.httpBasicAuth}`);

    return headers;
  }

}
