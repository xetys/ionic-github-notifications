import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GithubNotifications} from "../../providers/github-notifications";
import {Notification} from "./notification.model";
import {NotificationDetails} from "./notification-details.component";
import * as _ from 'lodash';

/**
 * Generated class for the Notifications page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class Notifications {

  notifications: Notification[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gitHubNotifications: GithubNotifications
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Notifications');

    //this.gitHubNotifications.load()
    //  .subscribe(notifications => this.notifications = this.sortNotificationsByDate(notifications));
    this.gitHubNotifications.replaySubject.subscribe(notification => this.notifications.push(notification));
  }

  sortNotificationsByDate(notifications: Notification[]): Notification[] {
    return _.orderBy(notifications, ['updated_at'], ['desc']);
  }

  iconColor(notification: Notification) {
    const thread = notification.thread;
    if (thread == null) {
      return "dark";
    } else {
      switch (thread.state) {
        case "closed":
          return "danger";
        case "open":
          return "secondary";
        case "merged":
          return 'dark';
        default:
          return "light";
      }
    }
  }

  iconName(type: string) {
    switch (type) {
      case 'PullRequest':
        return 'git-pull-request';
      case 'Issue':
        return 'alert';
      case 'Commit':
        return 'git-commit';
      default:
        return 'check';
    }
  }


  openThread(notification) {
    this.gitHubNotifications.loadThread(notification)
      .subscribe(thread => {
        this.gitHubNotifications.loadedThread = thread;
        this.navCtrl.setRoot(NotificationDetails);
      });
  }

  wipeStorage() {
    this.gitHubNotifications.wipeStorage().then(() => {
      this.notifications = [];
      this.gitHubNotifications.syncNotifications();
    });
  }

  resync() {
    this.notifications = [];
    this.gitHubNotifications.syncNotifications(); 
  }

}
