import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the TestService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TestService {

  subject: ReplaySubject<number> = new ReplaySubject();

  constructor() {
    setInterval(() => {
      this.subject.next(Math.random());
    }, 999);
  }
  
  randomNumberStream(): Observable<number> {
    return this.subject.asObservable();
  }

}
