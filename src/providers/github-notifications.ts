import { Subject } from './../pages/notifications/notification.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import {GithubAuth} from "./github-auth";
import {Observable} from "rxjs/Observable";
import {Notification, Thread} from "../pages/notifications/notification.model";
import {Storage} from "@ionic/storage";
import {ReplaySubject} from "rxjs/ReplaySubject";

const PER_PAGE = 10;

/*
  Generated class for the GithubNotifications provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GithubNotifications {

  gitHubApiUrl: string = 'https://api.github.com';
  loadedThread: Thread;

  lastUpdate: Date;
  replaySubject: ReplaySubject<Notification> = new ReplaySubject();

  constructor(
    public http: Http,
    public storage: Storage,
    public githubAuth: GithubAuth
  ) {
    storage.ready().then(() => {
      storage.get('notification-last-update').then(lastUpdate => {
        if(lastUpdate) {
          this.lastUpdate = lastUpdate;
        } else {
          this.lastUpdate = new Date(0);
        }
      });
      this.syncNotifications();
    });
  }


  load(page: number = 1): Observable<Notification[]> {
/*    return this.http.get(
      `${this.gitHubApiUrl}/notifications?page=${page}&per_page=${PER_PAGE}`,
      {headers: this.githubAuth.getAuthHeaders()}
    )
      .map(response => <Notification[]>response.json());*/

    return this.loadFromStorage(page)
      .map(jsonText => {

        return jsonText;
      });
  }


  loadThread(notification: Notification): Observable<Thread> {
    return this.http.get(notification.subject.url)
      .map(response => <Thread>response.json());
  }

  storeNotifications(page: number = 1, notifications: Notification[]) {
    console.log('store in storage', notifications);
    this.storage.set(`notifications-${page}`, notifications);
  }

  wipeStorage(): Promise<any> {
    this.lastUpdate = new Date(0);
    return this.storage.remove('notifications')
    .then(() => this.storage.remove('notification-last-update')
    .then(() => this.storage.remove('notifications-1')));
  }

  loadFromStorage(page: number = 1): Observable<Notification[]> {
    let subject: ReplaySubject<Notification[]> = new ReplaySubject();

    this.storage.ready().then(() => {
      return this.storage.get(`notifications-${page}`).then(response => {
        //we found a result, return this
        if (response) {
          subject.next(response);
        } else {
          //nothing found in storage, so get it from GitHub
          this.http.get(`${this.gitHubApiUrl}/notifications?page=${page}&per_page=${PER_PAGE}`,
            {headers: this.githubAuth.getAuthHeaders()})
            .subscribe(response => {
              //get thread
              const notifications: Notification[]= response.json();
              notifications.forEach(notification => {
                this.loadThread(notification)
                  .subscribe(thread => {
                    notification.thread = thread;
                  });
              });
              subject.next(notifications);
              this.storeNotifications(page, notifications);
            });
        }
      }).catch(() => {
        console.log('error while getting notifications from storage');
      });
    });

    return subject.asObservable();

  }


  syncNotifications() {
    //get notifications from storage
    this.storage.get('notifications').then(storedNotifications => {
      if (!storedNotifications) {
        console.log('empty store');
        storedNotifications = [];
      } 
      storedNotifications.forEach(storedNotification => {
        this.replaySubject.next(storedNotification);
      });
      //fetch notifications from lastUpdate
      this.http.get(`${this.gitHubApiUrl}/notifications?since=${this.lastUpdate.toISOString()}&page=1&per_page=20`,
      { headers: this.githubAuth.getAuthHeaders() })
        .subscribe(response => {
          const notifications: Notification[] = <Notification[]>response.json();
          const notificationUrls = notifications.map(e => e.subject.url);

          //remove existing notifications, as they will be added later          
          storedNotifications.forEach(storedNotification => {
            console.log('storedNotification forEach')
            let index = notificationUrls.indexOf(storedNotification.subject.url);
           if (index > -1) {
             storedNotifications.splice(index,1);
           }
          });

          notifications.forEach(notification => {
            //fetch notifications sub contents from api
            console.log('fetch forEach')
            this.loadThread(notification)
              .subscribe(thread => {
                notification.thread = thread;
                storedNotifications.push(notification);
                this.storage.set('notifications', storedNotifications);
                this.lastUpdate = new Date();
                this.storage.set('notification-last-update', this.lastUpdate);
                this.replaySubject.next(notification);
              }); 
          });
        });

    });
    
    //set new lastUpdate
  }
}
